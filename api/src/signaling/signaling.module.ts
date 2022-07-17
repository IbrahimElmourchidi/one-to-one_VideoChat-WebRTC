import { Module } from '@nestjs/common';
import { SignalingGateway } from './gateways/signaling.gateway';

@Module({
  imports: [],
  providers: [SignalingGateway],
})
export class SignalingModule {}
