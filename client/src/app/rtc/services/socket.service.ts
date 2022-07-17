import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class CustomSocket extends Socket {
  constructor() {
    super({
      url: env.socketRoot,
      options: {},
    });
  }
}
