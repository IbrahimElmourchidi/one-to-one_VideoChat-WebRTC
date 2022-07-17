import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RtcState {
  socketId?: string;
  localStream?: any;
  remoteStream?: any;
  screenSharingStream?: any;
  screenSharingActive: boolean;
}
@Injectable()
export class RtcStateService {
  constructor() {}
  private state = new BehaviorSubject<RtcState>({
    screenSharingActive: false,
  });
  currentState = this.state.asObservable();

  changeState(newState: Partial<RtcState>) {
    const current = this.state.getValue();
    newState = Object.assign(current, newState);
    this.state.next(newState as RtcState);
  }
}
