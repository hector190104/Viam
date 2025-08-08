import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <ng-content></ng-content>
    <router-outlet></router-outlet>
    <app-navbar></app-navbar>
  `
})
export class MainLayoutComponent {}