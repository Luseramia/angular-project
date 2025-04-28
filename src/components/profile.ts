import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { LoginStateService, UserService } from "../services/user";
import { HttpService } from "../services/http-service";
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../components-html/profile.html',
})
export class Profile implements OnInit {
  constructor(private router: Router) {}
  private httpService = inject(HttpService);
  private loginStateService = inject(LoginStateService);
  async manageProduct() {
    this.router.navigate(['/getProductByUserId'])
  }
  ngOnInit(): void {
  }
}