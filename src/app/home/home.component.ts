import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, CommonModule],
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  loadingLogin = false;
  loadingRegistro = false;

  constructor(private router: Router) {}

  irALogin() {
    this.loadingLogin = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.loadingLogin = false;
    }, 900); // Simula animación de carga
  }

  irARegistro() {
    this.loadingRegistro = true;
    setTimeout(() => {
      this.router.navigate(['/registro']);
      this.loadingRegistro = false;
    }, 900); // Simula animación de carga
  }
}
  