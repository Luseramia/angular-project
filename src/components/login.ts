import { Component, signal, inject, EventEmitter ,Output } from '@angular/core';
import exp from 'constants';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpService } from '../services/http-service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],

  templateUrl: '../components-html/login.html',
})
export class Login {
  @Output() loginSuccess = new EventEmitter<void>();
  
  hide = signal(true);
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private router: Router,private cdr: ChangeDetectorRef) {}
  private httpService = inject(HttpService);
  async Login(): Promise<void> {
    const dataToSend: DataToSend = {
      username: this.usernameControl.value!,
      password: this.passwordControl.value!,
    };
    // this.router.navigate(['/test']);
    const result = await this.httpService.PostData('/post1', dataToSend);
    if (result.status == 200) {
      this.loginSuccess.emit();
    }
  }
}

interface DataToSend {
  username: string;
  password: string;
}
