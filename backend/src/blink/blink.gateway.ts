import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BlinkService } from './blink.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class BlinkGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly blinkService: BlinkService) {}

  @WebSocketServer()
  server: Server;

  connections = 0;

  private logger: Logger = new Logger(BlinkGateway.name);

  handleConnection(client: Socket): any {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('connections', this.connections);
    this.connections++;
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('connections', this.connections);
    this.connections--;
  }

  @SubscribeMessage('chatToServer')
  async onChat(@ConnectedSocket() client: Socket, @MessageBody() data) {
    client.broadcast.emit('chatToClient', data);
    client.broadcast.emit('blink', 'blink');
  }
}
