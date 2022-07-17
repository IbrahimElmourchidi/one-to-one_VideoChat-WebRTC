import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RtcContainerComponent } from './components/rtc-container/rtc-container.component';

const rtcRoutes: Routes = [
  {
    path: '',
    component: RtcContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rtcRoutes)],
  exports: [RouterModule],
})
export class RtcRoutingModule {}
