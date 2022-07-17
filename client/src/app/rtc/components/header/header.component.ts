import { Component } from '@angular/core';

@Component({
  selector: 'rtc-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class RtcHeaderComponent {
  dark = false;
  toggleMode() {
    let root = document.querySelector('html');
    if (root?.classList.contains('light')) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('view-mode', 'dark');
      this.dark = true;
      return;
    }
    root?.classList.remove('dark');
    root?.classList.add('light');
    localStorage.setItem('view-mode', 'light');
    this.dark = false;
  }
}
