
import { Component,Input  } from '@angular/core';
import { Navbar } from './navbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'mainlayout',
  standalone: true,
  imports:[Navbar,MatSidenavModule],
  templateUrl:'../components-html/mainlayout.html'
,
})

export class MainLayout  {
  opened = true
  }