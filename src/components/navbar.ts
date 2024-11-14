import { Component, EventEmitter, Input ,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import {baseUrl} from '../../config.json'
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatSidenavModule],
  templateUrl: '../components-html/navbar.html',
})
export class Navbar {
  @Output() Navtoggle = new EventEmitter<void>();
  baseUrl = baseUrl;
  Navshow(){
    this.Navtoggle.emit();
  }
  // @Input() Navtoggle!:Promise<MatDrawerToggleResult>;
}
