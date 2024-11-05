import {
  Component,
  Injectable,
  OnChanges,
  SimpleChanges,
  OnInit,
  ApplicationRef
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Login } from '../components/login';
import { log } from 'console';
import { MainLayout } from '../components/MainLayout';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Login,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MainLayout
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit,OnChanges {
  constructor(private cdr: ChangeDetectorRef, private router: Router,private appRef: ApplicationRef) {}
  login = false;
  title = 'angular-project';
  test = false;
  abc = 'abc';
  initialCount = 18;
  id: string = '';
  firstName: string = 'asdfasdf';
  async setLogin(): Promise<void>  {
    this.login = !this.login;
    console.log("Setlogin");
    this.cdr.detectChanges();
    console.log(this.login)
  }
  
  ngOnInit(): void {
    console.log('เด้งไปหน้าล็อคอิน')
    if (!this.login) {
      this.router.navigate(['']);
    }
    else{
      this.router.navigate(['/test']);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Input properties changed:', changes);

  }
  // getData(): void{
  //   this.http.get('http://localhost:5192/test1',{ withCredentials: true }).subscribe(res=>{

  //     console.log('respones = ',res);
  //   })
  // }
}
