// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  formularioLogin: FormGroup;
  loginError: string | null = null;
  intentosFallidos = 0;
  bloqueoActivo = false;
  tiempoBloqueo = 30000;
  loading = false;
  // Animación extra para feedback visual al iniciar sesión
  animacionBoton = false;
  mostrarPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  volver() {
    this.location.back();
  }

  iniciarSesion() {
    if (this.bloqueoActivo) return;

    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formularioLogin.value;
    this.loginError = null;
    this.loading = true;
    this.animacionBoton = true;

    // Delay visual para animación de botón antes de enviar petición
    setTimeout(() => {
      this.http.post<any>('http://localhost:8080/api/auth/login', { email, password })
        .subscribe({
          next: (resp) => {
            this.loading = false;
            this.animacionBoton = false;
            localStorage.setItem('usuarioId', resp.id);
            this.intentosFallidos = 0;
            this.router.navigate(['/cursos']);
          },
          error: (err) => {
            this.loading = false;
            this.animacionBoton = false;
            this.manejarErrorLogin(err);
          }
        });
    }, 350); // 350ms para que la animación se note
  }

  private manejarErrorLogin(err?: any) {
    this.intentosFallidos++;
    this.loginError = err?.error?.message || 'Email o contraseña incorrectos';

    if (this.intentosFallidos >= 3) {
      this.bloqueoActivo = true;
      this.loginError = `Demasiados intentos fallidos. Intenta de nuevo en ${this.tiempoBloqueo / 1000} segundos.`;
      setTimeout(() => {
        this.bloqueoActivo = false;
        this.loginError = null;
        this.intentosFallidos = 0;
      }, this.tiempoBloqueo);
    }
  }
}
