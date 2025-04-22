import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { baseUrl } from '../../config.json';
import { Router } from '@angular/router';
import { log } from 'console';
import { LoginStateService } from '../services/user';
import { AuthService } from '../router-gaurd/auth.service';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: '../components-html/navbar.html',
})
export class Navbar {
  @Input() login!: boolean;
  @Output() Navtoggle = new EventEmitter<void>();
  private loginStateService = inject(LoginStateService)
  private authService = inject(AuthService)
  constructor(private router: Router) {}
  baseUrl = baseUrl;
  Navshow() {
    this.Navtoggle.emit();
  }
  async routeLogin() {
      this.router.navigate(['/profile'])
  }
  // @Input() Navtoggle!:Promise<MatDrawerToggleResult>;
}
