import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { baseUrl } from '../../config.json';
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: '../components-html/navbar.html',
})
export class Navbar {
  @Input() login!: boolean;
  @Output() loginChange = new EventEmitter<boolean>();
  @Output() Navtoggle = new EventEmitter<void>();
  constructor(private router: Router) {}
  baseUrl = baseUrl;
  Navshow() {
    this.Navtoggle.emit();
  }
  async routeLogin(newValue: boolean) {
    console.log(this.login)
    if (this.login) {
      this.loginChange.emit(newValue);
    } else {
      this.loginChange.emit(newValue);
    }
  }
  // @Input() Navtoggle!:Promise<MatDrawerToggleResult>;
}
