import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RtcHeaderComponent } from './components/header/header.component';
import { RtcMainComponent } from './components/main/main.component';
import { RtcContainerComponent } from './components/rtc-container/rtc-container.component';
import { RtcRoutingModule } from './rtc-routing.module';
import { RtcStateService } from './services/rtc-state.service';
import { SignalingService } from './services/signaling.service';
import { CustomSocket } from './services/socket.service';

@NgModule({
  declarations: [RtcContainerComponent, RtcHeaderComponent, RtcMainComponent],
  imports: [RtcRoutingModule, CommonModule],
  providers: [CustomSocket, SignalingService, RtcStateService],
})
export class RtcModule {}
