import { Component } from '@angular/core';
export interface Constrains {
  audio: boolean;
  video: boolean;
}
@Component({
  selector: 'rtc-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class RtcMainComponent {
  local: Constrains = {
    audio: false,
    video: false,
  };
  hideSide = false;
  toggleSidenav() {
    this.hideSide = !this.hideSide;
  }

  toggleMic() {
    this.local.audio = !this.local.audio;
  }

  toggleCam() {
    this.local.video = !this.local.video;
  }
}
