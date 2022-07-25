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
  constructor() {}
  connectedPeers = {};
  async onModuleInit() {}

  handleConnection(socket: any) {
    console.log(`new connection with id ${socket.id}`);
    this.connectedPeers[socket.id] = false;
    console.log(this.connectedPeers);
    socket.emit('connection', socket.id);
  }

  @SubscribeMessage('giveMeId')
  handleMessage(socket: Socket, payload: { page: number }) {
    socket.emit('takeId', socket.id);
  }

  @SubscribeMessage('start-calling')
  handlePreOffer(socket: Socket, calleeId: string) {
    if (socket.id === calleeId) {
      let data: preOfferAnswer = {
        type: 'busy',
        socketId: calleeId,
      };
      socket.emit('busy-callee', data);
      console.log('sorry you are busy');
    } else if (this.connectedPeers[calleeId] === false) {
      this.connectedPeers[calleeId] = true;
      this.connectedPeers[socket.id] = true;
      this.server.to(calleeId).emit('incomming-call', socket.id);
    } else {
      let data: preOfferAnswer = {
        type: 'busy',
        socketId: calleeId,
      };
      socket.emit('busy-callee', data);
    }
  }

  @SubscribeMessage('stop-calling')
  stopCallingHandler(socket: Socket, calleeId: string) {
    this.connectedPeers[socket.id] = false;
    this.connectedPeers[calleeId] = false;
    this.server.to(calleeId).emit('stop-calling', {});
  }

  @SubscribeMessage('accept-call')
  acceptCallingHandler(socket: Socket, callerId: string) {
    let data: preOfferAnswer = {
      type: 'accept',
      socketId: socket.id,
    };
    this.server.to(callerId).emit('accept-call', data);
  }

  @SubscribeMessage('decline-call')
  declineCall(socket: Socket, callerId) {
    let data: preOfferAnswer = {
      type: 'decline',
      socketId: socket.id,
    };
    this.server.to(callerId).emit('decline-call', data);
  }

  @SubscribeMessage('end-call')
  endCallingHandler(socket: Socket, calleeId: string) {
    this.connectedPeers[calleeId] = false;
    this.connectedPeers[socket.id] = false;
    let data: preOfferAnswer = {
      type: 'end',
      socketId: socket.id,
    };
    this.server.to(calleeId).emit('end-call', data);
  }

  @SubscribeMessage('webRtcSignaling')
  RtcSignalingHandler(socket: Socket, data: RtcSignalBody) {
    if (this.connectedPeers[data.CalleeSocketId] === 'undefined') {
      socket.emit('user not online');
    } else {
      data.CalleeSocketId = socket.id;
      this.server.to(data.CalleeSocketId).emit('webRtcSignaling', data);
    }
  }

  handleDisconnect(socket: any) {
    delete this.connectedPeers[socket.id];
  }
}

export interface preOfferAnswer {
  type: string;
  socketId: string;
}

export interface RtcSignalBody {
  type: string;
  CalleeSocketId: string;
  data: any;
}
