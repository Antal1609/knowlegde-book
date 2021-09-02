import { Module } from '@nestjs/common';
import { BlinkService } from './blink.service';
import { BlinkGateway } from './blink.gateway';

@Module({
  providers: [BlinkGateway, BlinkService],
})
export class BlinkModule {}
