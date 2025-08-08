import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [NgClass, NgIf]
})
export class NavbarComponent {
  seccionActual: 'curso' | 'materias' | 'perfil' | 'configuracion' | null = null;
  tieneNotificaciones = false; // Cambia a false si no hay notificaciones

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.startsWith('/cursos/') && url.split('/').length > 2) {
        this.seccionActual = 'curso';
      } else if (url.startsWith('/cursos')) {
        this.seccionActual = 'materias';
      } else if (url.startsWith('/perfil')) {
        this.seccionActual = 'perfil';
      } else if (url.startsWith('/configuracion')) {
        this.seccionActual = 'configuracion';
      } else {
        this.seccionActual = null;
      }
    });
  }

  irCursoActual() {
    this.router.navigate(['/cursos', 'ciencia']);
  }

  irMaterias() {
    this.router.navigate(['/cursos']);
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}


