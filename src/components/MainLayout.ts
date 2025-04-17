import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Navbar } from './navbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'mainlayout',
  standalone: true,
  imports: [
    Navbar,
    MatSidenavModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: '../components-html/mainlayout.html',
})
export class MainLayout {
  @Input() login!: boolean;
  @Output() loginChange = new EventEmitter<boolean>();
  opened = false;
  updateLogin(newValue: boolean) {
    this.login = newValue;
    this.loginChange.emit(newValue);
  }
}
