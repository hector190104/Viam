import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // <-- IMPORTANTE

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // <-- AGREGA RouterModule AQUÍ
})
export class RegisterComponent {
  mostrarPassword = false;
  formularioRegistro: FormGroup;
  errorMsg: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['usuario', Validators.required]
    });
  }

  registrar() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = null;

    const usuario = {
      nombre: this.formularioRegistro.value.nombre,
      email: this.formularioRegistro.value.email,
      password: this.formularioRegistro.value.password,
      rol: this.formularioRegistro.value.rol.toUpperCase(),
      fechaRegistro: new Date().toISOString(),
      activo: true
    };

    this.http.post<any>('http://localhost:8080/api/usuarios', usuario)
      .subscribe({
        next: (nuevoUsuario) => {
          // Crear perfil automáticamente después de crear el usuario
          const perfil = {
            usuario_id: nuevoUsuario.id, // O usuarioId si tu backend lo espera así
            activo: true,
            biografia: '',
            foto_perfil: '', // O una URL por defecto si quieres
            ultimo_acceso: new Date().toISOString()
          };
          this.http.post('http://localhost:8080/api/perfiles', perfil)
            .subscribe({
              next: () => {
                setTimeout(() => {
                  this.loading = false;
                  this.router.navigate(['/formulario']);
                }, 1200);
              },
              error: () => {
                setTimeout(() => {
                  this.loading = false;
                  this.errorMsg = 'Usuario creado, pero hubo un error creando el perfil.';
                  this.router.navigate(['/formulario']);
                }, 1200);
              }
            });
        },
        error: (err) => {
          setTimeout(() => {
            this.loading = false;
            if (
              err.error?.message?.includes('duplicate key value') ||
              (err.error?.message?.includes('email') && err.error?.message?.includes('already exists'))
            ) {
              this.errorMsg = 'El correo ya está registrado. Usa otro correo o inicia sesión.';
            } else {
              this.errorMsg = err.error?.message || 'Error al registrar. Intenta de nuevo.';
            }
          }, 900);
        }
      });
  }

  volver() {
    this.location.back();
  }
}
