import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RtcState, RtcStateService } from '../../services/rtc-state.service';
import { SignalingService } from '../../services/signaling.service';
import { preOfferAnswer } from '../main/main.component';

@Component({
  selector: 'rtc-contianer',
  templateUrl: 'rtc-container.component.html',
  styleUrls: ['rtc-container.component.scss'],
})
export class RtcContainerComponent implements OnInit {
  @ViewChild('openIncomminModal') openIncomminModalBtn!: ElementRef;
  @ViewChild('closeIncomminModal') closeIncomminModal!: ElementRef;
  @ViewChild('DeclineBtn') DeclineBtn!: ElementRef;
  incommingCallListener!: Subscription;
  acceptCallListener!: Subscription;
  stopCallingListener!: Subscription;
  audio = new Audio();
  appState!: RtcState;
  constructor(
    private appStateService: RtcStateService,
    private signalingService: SignalingService,
    private router: Router
  ) {
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
      this.stateHandler(data);
    });
  }

  ngOnInit(): void {
    this.incommingCallListener = this.signalingService
      .listen('incomming-call')
      .subscribe((data) => {
        this.appStateService.changeState({
          incommingCall: true,
          audio: { name: 'incomming', on: true },
          remoteSocket: data,
          calling: true,
        });
      });
    this.acceptCallListener = this.signalingService
      .listen('accept-call')
      .subscribe((data: preOfferAnswer) => {
        this.appStateService.changeState({
          incommingCall: false,
          calling: false,
          outgoingCall: true,
          audio: { name: '', on: false },
          informationMessage: `connecting to ${this.appState.remoteSocket}`,
          remoteSocket: data.socketId,
        });
        this.router.navigate(['/main']);
      });
    this.stopCallingListener = this.signalingService
      .listen('stop-calling')
      .subscribe(() => {
        this.appStateService.changeState({
          audio: { name: '', on: false },
          calling: false,
          incommingCall: false,
          outgoingCall: false,
          remoteSocket: '',
        });
        this.closeIncomminModal.nativeElement.click()
      });
  }

  stateHandler(state: RtcState) {
    // audio handler
    if (state.audio?.name && state.audio.on) {
      this.playAudio(state.audio.name);
    } else if (!state.audio?.name && !state.audio?.on) {
      console.log('sound stop');
      this.stopAudio();
    }
    // incomming modal handler
    if (state.incommingCall) {
      this.openIncomminModalBtn.nativeElement.click();
    }
  }

  playAudio(audioName: string) {
    this.audio.src = `/assets/audio/${audioName}.mp3`;
    this.audio.load();
    this.audio.play();
    if (audioName === 'calling') {
      setTimeout(() => {
        this.stopAudio();
      }, 30000);
    }
  }

  stopAudio() {
    this.audio.pause();
  }

  onAccept() {
    this.signalingService.emit('accept-call', this.appState.remoteSocket);
    this.appStateService.changeState({
      outgoingCall: true,
      incommingCall: false,
      calling:false,
      informationMessage: `connecting to ${this.appState.remoteSocket}`,
      audio: { name: '', on: false },
    });
    this.closeIncomminModal.nativeElement.click();
    this.router.navigate(['/main']);
  }

  onDecline() {
    this.signalingService.emit('decline-call', this.appState.remoteSocket);
    this.appStateService.changeState({
      remoteSocket: '',
      calling: false,
      incommingCall: false,
      audio: { name: '', on: false },
    });
    this.closeIncomminModal.nativeElement.click();
  }
}
