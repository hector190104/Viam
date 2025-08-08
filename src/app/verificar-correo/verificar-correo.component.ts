import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VerificarCorreoComponent {
  @Input() usuarioId!: number;
  @Output() verificado = new EventEmitter<boolean>();
  codigo: string = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private http: HttpClient) {}

  verificar() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.http.post(`/api/usuarios/${this.usuarioId}/validar-codigo-verificacion?codigo=${this.codigo}`, {})
      .subscribe({
        next: () => {
          this.successMsg = '¡Correo verificado correctamente!';
          this.verificado.emit(true);
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Código incorrecto o expirado.';
          this.loading = false;
        }
      });
  }

  reenviarCodigo() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.http.post(`/api/usuarios/${this.usuarioId}/enviar-codigo-verificacion`, {})
      .subscribe({
        next: () => {
          this.successMsg = 'Código reenviado al correo.';
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo reenviar el código.';
          this.loading = false;
        }
      });
  }
}