import { OnModuleInit, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { allowedHosts } from './allowed-hosts';

@WebSocketGateway({
  cors: { origin: allowedHosts },
})
export class SignalingGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;
  conn = 0;
  halt = false;
  constructor() {}

  async onModuleInit() {}

  handleConnection(socket: any) {
    console.log(`new connection with id ${socket.id}`);
  }

  @SubscribeMessage('getRoomList')
  handleMessage(socket: Socket, payload: { page: number }) {
    console.log(payload);
  }

  handleDisconnect(socket: any) {
    console.log(`${socket.id} disconnected`);
  }
}
