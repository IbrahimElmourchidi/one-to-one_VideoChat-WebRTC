import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RtcMainComponent } from './components/main/main.component';
import { RtcMenuComponent } from './components/menu/menu.component';
import { RtcContainerComponent } from './components/rtc-container/rtc-container.component';

const rtcRoutes: Routes = [
  {
    path: '',
    component: RtcContainerComponent,
    children: [
      {
        path: '',
        component: RtcMenuComponent,
      },
      {
        path: 'main',
        component: RtcMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rtcRoutes)],
  exports: [RouterModule],
})
export class RtcRoutingModule {}
