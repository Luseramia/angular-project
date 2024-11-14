import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [{ provide: APP_BASE_HREF, useValue: '/browser' }]
})
export class AppModule { }
