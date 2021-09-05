import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BlinkModule } from './blink/blink.module';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    DatabaseModule,
    BlinkModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
