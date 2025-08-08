import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';

declare var bootstrap: any;

interface Curso {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  modalTipo: 'inscritos' | 'completados' | 'medallas' = 'inscritos';
  modalTitulo = '';
  loading = true;
  loadingMsg: string | null = null;
  private cardRef: HTMLElement | null = null;
  errorMsg: string | null = null;

  cursosInscritos: Curso[] = [];
  cursosCompletados: Curso[] = [];
  progresoPorCurso: { [cursoId: string]: number } = {};
  medallas = 0;
  puntos = 0;
  nombreUsuario = '';
  fotoPerfil = 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/user.svg';

  editandoBio = false;
  guardandoBio = false;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {
    this.perfilForm = this.fb.group({
      biografia: [''],
      ultimoAcceso: ['']
    });
  }

  ngOnInit() {
    // Referencia a la card para animación de cierre de sesión
    setTimeout(() => {
      this.cardRef = document.querySelector('.perfil-card') as HTMLElement;
    }, 0);
    if (typeof window === 'undefined' || !window.localStorage) {
      this.errorMsg = 'No se puede acceder al almacenamiento local en este entorno.';
      this.loading = false;
      return;
    }
    const userIdStr = localStorage.getItem('usuarioId');
    const userId = userIdStr ? Number(userIdStr) : 0;
    if (!userId || isNaN(userId)) {
      this.errorMsg = 'No se encontró el usuario autenticado.';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.loadingMsg = null;
    this.http.get<any>(`http://localhost:8080/api/perfiles/me?usuarioId=${userId}`).subscribe({
      next: (data) => {
        this.nombreUsuario = data.usuario?.nombre || 'Usuario';
        this.fotoPerfil = data.fotoPerfil || this.fotoPerfil;
        this.perfilForm.patchValue({
          biografia: data.biografia || '',
          ultimoAcceso: data.ultimoAcceso ? new Date(data.ultimoAcceso).toLocaleString() : ''
        });
        this.cursosInscritos = data.cursosInscritos || [];
        this.cursosCompletados = data.cursosCompletados || [];
        this.progresoPorCurso = data.progresoPorCurso || {};
        this.medallas = data.gamificacion?.medallas || 0;
        this.puntos = data.gamificacion?.puntos || 0;
        this.loading = false;
        this.loadingMsg = null;
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar el perfil.';
        this.loading = false;
        this.loadingMsg = null;
      }
    });
  }

  calcularProgreso(curso: Curso): number {
    return this.progresoPorCurso[curso.id] ?? 0;
  }

  abrirModal(tipo: 'inscritos' | 'completados' | 'medallas') {
    this.modalTipo = tipo;
    if (tipo === 'inscritos') this.modalTitulo = 'Cursos Inscritos';
    if (tipo === 'completados') this.modalTitulo = 'Cursos Completados';
    if (tipo === 'medallas') this.modalTitulo = 'Tus Medallas';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('perfilModal'));
      modal.show();
    }, 0);
  }

  volver() {
    this.location.back();
  }

  cerrarSesion() {
    // Animación igual a configuración: fadeout card + overlay de carga
    this.loading = true;
    this.loadingMsg = 'Cerrando sesión...';
    if (this.cardRef) {
      this.cardRef.style.transition = 'opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)';
      this.cardRef.style.opacity = '0.3';
      this.cardRef.style.transform = 'scale(0.97) translateY(18px)';
    }
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.loading = false;
      this.loadingMsg = null;
      this.router.navigate(['/home']);
      if (this.cardRef) {
        this.cardRef.style.opacity = '';
        this.cardRef.style.transform = '';
        this.cardRef.style.transition = '';
      }
    }, 1100);
  }

  getCursosCompletados() {
    return this.cursosCompletados;
  }

  activarEdicionBio() {
    this.editandoBio = true;
  }

  guardarBiografia() {
    this.guardandoBio = true;
    this.errorMsg = null;
    const userIdStr = localStorage.getItem('usuarioId');
    const userId = userIdStr ? Number(userIdStr) : 0;
    const nuevaBio = this.perfilForm.value.biografia || '';
    if (!userId || isNaN(userId)) {
      this.errorMsg = 'No se encontró el usuario autenticado.';
      this.guardandoBio = false;
      return;
    }
    this.usuarioService.actualizarBiografia(userId, nuevaBio).subscribe({
      next: () => {
        this.editandoBio = false;
        this.guardandoBio = false;
      },
      error: () => {
        this.errorMsg = 'No se pudo guardar la biografía. Intenta de nuevo.';
        this.guardandoBio = false;
      }
    });
  }
}
