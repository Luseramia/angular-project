import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { baseUrl } from '../../config.json';
import { Router } from '@angular/router';
import { log } from 'console';
import {MatIconModule} from '@angular/material/icon';
import { LoginStateService } from '../services/user';
import {MatBadgeModule} from '@angular/material/badge';
import { AuthService } from '../router-gaurd/auth.service';
import { HttpService } from '../services/http-service';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule,MatBadgeModule],
  templateUrl: '../components-html/navbar.html',
})
export class Navbar implements OnInit {
  @Input() login!: boolean;
  @Output() Navtoggle = new EventEmitter<void>();
  private loginStateService = inject(LoginStateService)
  private authService = inject(AuthService)
  private httpService = inject(HttpService)
  constructor(private router: Router) {}
  baseUrl = baseUrl;
  async ngOnInit(): Promise<void> {
    const result = await this.httpService.GetData("/cart/getItemInCart");
    console.log(result);
  }
  Navshow() {
    this.Navtoggle.emit();
  }
  routeLogin() {
      this.router.navigate(['/profile'])
  }
  routeToHomePage(){
    this.router.navigate([''])
  }
  // @Input() Navtoggle!:Promise<MatDrawerToggleResult>;
}
