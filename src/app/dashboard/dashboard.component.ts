import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cursos: any[] = [];
  loading = false;
  errorMsg = '';
  showForm = false;
  cursoForm: FormGroup;
  instructorId: number = 1; // Puedes cambiar el id según el usuario logueado
  successMsg = '';

  constructor(private usuarioService: UsuarioService, private router: Router, private fb: FormBuilder) {
    this.cursoForm = this.fb.group({
      titulo: ['', Validators.required],
      slug: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImagen: [''],
      nivel: ['', Validators.required],
      duracionHoras: [1, [Validators.required, Validators.min(1)]],
      puntajeMaximo: [100, [Validators.required, Validators.min(1)]],
      instructorId: [this.instructorId, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.loading = true;
    this.usuarioService.obtenerTodosLosCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error al cargar cursos';
        this.loading = false;
      }
    });
  }

  agregarCurso() {
    this.showForm = !this.showForm;
    this.successMsg = '';
    this.errorMsg = '';
    this.cursoForm.reset();
  }

  submitCurso() {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.cursoForm.value;
    const cursoPayload = {
      titulo: formValue.titulo,
      slug: formValue.slug,
      descripcion: formValue.descripcion,
      urlImagen: formValue.urlImagen,
      nivel: formValue.nivel,
      duracionHoras: formValue.duracionHoras,
      puntajeMaximo: formValue.puntajeMaximo,
      instructor: { id: formValue.instructorId }
    };
    this.usuarioService.crearCurso(cursoPayload).subscribe({
      next: (curso) => {
        this.successMsg = 'Curso registrado correctamente';
        this.showForm = false;
        this.cargarCursos();
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error al registrar curso';
        this.loading = false;
      }
    });
  }

  verCurso(curso: any) {
    this.router.navigate(['/cursos', curso.slug || curso.id]);
  }
}
