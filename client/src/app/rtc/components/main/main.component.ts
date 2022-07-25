import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RtcState, RtcStateService } from '../../services/rtc-state.service';
import { SignalingService } from '../../services/signaling.service';
export interface Constrains {
  audio: boolean;
  video: boolean;
}
@Component({
  selector: 'rtc-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class RtcMainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('localStream') localStream!: ElementRef;
  @ViewChild('remoteStream') remoteStream!: ElementRef;
  @ViewChild('openIncomminModal') openModalBtn!: ElementRef;
  @ViewChild('DeclineBtn') DeclineBtn!: ElementRef;
  appState!: RtcState;
  local: Constrains = {
    audio: false,
    video: false,
  };

  //listeners start
  declineCallListener!: Subscription;
  busyCalleeListener!: Subscription;
  endCallListener!: Subscription;
  // listeners end

  constructor(
    private signalingService: SignalingService,
    private appStateService: RtcStateService,
    private router: Router
  ) {
    appStateService.currentState.subscribe((data) => {
      this.appState = data;
    });
  }

  ngOnInit(): void {
    this.declineCallListener = this.signalingService
      .listen('decline-call')
      .subscribe((data: preOfferAnswer) => {
        this.appStateService.changeState({
          audio: { name: 'decline', on: true },
          calling: false,
          informationMessage: 'call was declined',
          remoteSocket: '',
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    this.busyCalleeListener = this.signalingService
      .listen('busy-callee')
      .subscribe((data: preOfferAnswer) => {
        this.appStateService.changeState({
          audio: { name: 'busy', on: true },
          calling: false,
          informationMessage: 'callee is busy right now',
          remoteSocket: '',
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    this.endCallListener = this.signalingService
      .listen('end-call')
      .subscribe((data) => {
        this.appStateService.changeState({
          informationMessage: 'call was ended',
          outgoingCall: false,
          remoteSocket: '',
          remoteStream: undefined,
        });
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
  }

  ngAfterViewInit(): void {}

  toggleMic() {
    this.local.audio = !this.local.audio;
  }

  toggleCam() {
    this.local.video = !this.local.video;
  }

  stopCalling() {
    this.signalingService.emit('stop-calling', this.appState.remoteSocket);
    this.appStateService.changeState({
      audio: { name: '', on: false },
      calling: false,
      remoteSocket: '',
      informationMessage: 'calling ended',
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  endOutGoingCall() {
    this.signalingService.emit('end-call', this.appState.remoteSocket);
    this.appStateService.changeState({
      outgoingCall: false,
      remoteStream: undefined,
      remoteSocket: '',
      informationMessage: 'call was ended',
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.appStateService.changeState({
      audio: { name: '', on: false },
      calling: false,
      outgoingCall: false,
      remoteSocket: '',
      remoteStream: undefined,
    });
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
