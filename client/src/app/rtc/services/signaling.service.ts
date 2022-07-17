import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSocket } from './socket.service';

@Injectable()
export class SignalingService {
  constructor(private socket: CustomSocket) {
    socket.connect();
  }
  listen(eventName: string): Observable<any> {
    return this.socket.fromEvent<any>(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
