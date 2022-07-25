import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { RtcState, RtcStateService } from '../../services/rtc-state.service';
import { SignalingService } from '../../services/signaling.service';

@Component({
  selector: 'rtc-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class RtcMenuComponent implements OnInit, OnDestroy {
  remoteSocketInput = '';
  socketId='' // this is for the copy button
  newSocketIdListener!: Subscription;
  iformationMessage = '';
  calling = false;
  appState!: RtcState;
  constructor(
    private signalingService: SignalingService,
    private appStateService: RtcStateService,
    private router: Router
  ) {
    this.appStateService.currentState.subscribe((data) => {
      this.appState = data;
    });
  }

  ngOnInit() {
    this.signalingService.getSocketId();
    this.newSocketIdListener = this.signalingService
      .listen('takeId')
      .subscribe((data) => {
        this.appStateService.changeState({
          localSocket: data,
        });
        this.socketId = data
      });
  }
  calleeIdField: FormControl = new FormControl<string>('', Validators.required);
  calleeForm = new FormGroup({
    calleeId: this.calleeIdField,
  });

  copySocketId(personalcode: any) {}

  startCalling() {
    if (this.calleeForm.valid) {
      this.appStateService.changeState({
        informationMessage: `calling ${this.remoteSocketInput} ...`,
        calling: true,
        audio: { on: true, name: 'calling' },
        remoteSocket: this.remoteSocketInput,
      });
      this.signalingService.emit('start-calling', this.appState.remoteSocket);
      this.router.navigate(['/main']);
    } else {
      Object.keys(this.calleeForm.controls).forEach((key) => {
        this.calleeForm.get(key)?.markAsDirty();
        this.calleeForm.get(key)?.markAllAsTouched();
      });
    }
  }

  ngOnDestroy(): void {
    this.newSocketIdListener.unsubscribe();
  }
}
