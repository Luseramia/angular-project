import { Component, Input } from '@angular/core';
import { Navbar } from './navbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

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
  opened = false;
}
