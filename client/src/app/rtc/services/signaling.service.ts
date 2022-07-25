import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RtcStateService } from './rtc-state.service';
import { CustomSocket } from './socket.service';

@Injectable()
export class SignalingService {
  id = '';
  remoteStream = new MediaStream();
  localStream!: MediaStream;

  constructor(private socket: CustomSocket, private appState: RtcStateService) {
    socket.connect();
    this.socket.on('connection', (data: string) => {
      this.id = data;
      this.getSocketId();
    });
    this.appState.currentState.subscribe((data) => {
      if (data.localStream) {
        this.localStream = data.localStream;
      }
    });
    this.getLocalStream();
  }

  listen(eventName: string): Observable<any> {
    return this.socket.fromEvent<any>(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  getSocketId() {
    this.emit('giveMeId', {});
  }

  sendPreOffer(calleeId: string) {
    console.log('sending pre-offer');
    this.emit('pre-offer', calleeId);
  }

  // WebRtc functions
  constrains = { video: false, audio: true };
  async getLocalStream(): Promise<void> {
    try {
      let stream = await navigator.mediaDevices.getUserMedia(this.constrains);
      this.appState.changeState({
        localStream: stream,
      });
    } catch (error) {
      console.log('cannont get local stream');
    }
  }
}
