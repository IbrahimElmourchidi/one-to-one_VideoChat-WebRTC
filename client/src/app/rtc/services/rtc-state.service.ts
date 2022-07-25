import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RtcState {
  localSocket?: string;
  remoteSocket?: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  informationMessage?: string;
  calling?: boolean;
  outgoingCall?:boolean;
  incommingCall?:boolean;
  audio?: { on: boolean; name: string };
}
@Injectable()
export class RtcStateService {
  constructor() {}
  private state = new BehaviorSubject<RtcState>({});
  currentState = this.state.asObservable();

  changeState(newState: Partial<RtcState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as RtcState);
  }

  getState() {
    return this.state.getValue();
  }
}
