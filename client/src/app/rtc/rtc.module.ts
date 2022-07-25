import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { RtcHeaderComponent } from './components/header/header.component';
import { RtcMainComponent } from './components/main/main.component';
import { RtcMenuComponent } from './components/menu/menu.component';
import { RtcContainerComponent } from './components/rtc-container/rtc-container.component';
import { RtcRoutingModule } from './rtc-routing.module';
import { RtcStateService } from './services/rtc-state.service';
import { SignalingService } from './services/signaling.service';
import { CustomSocket } from './services/socket.service';

@NgModule({
  declarations: [
    RtcContainerComponent,
    RtcHeaderComponent,
    RtcMainComponent,
    RtcMenuComponent,
    TruncatePipe,
  ],
  imports: [
    RtcRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
  ],
  providers: [CustomSocket, SignalingService, RtcStateService],
})
export class RtcModule {}
