import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent {
  cargando = false;
  constructor(private location: Location, private router: Router) {}

  volver() {
    this.router.navigate(['/cursos']);
  }

  mostrarCargaTemporal() {
    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
    }, 1600);
  }
}
