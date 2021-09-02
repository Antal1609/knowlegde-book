import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BlinkModule } from './blink/blink.module';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';

@Module({
  imports: [BlinkModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
