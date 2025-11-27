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
    formChanged = false;
    ngOnInit() {
      this.cargarCursos();
      this.cursoForm.valueChanges.subscribe(() => {
        this.formChanged = this.editandoCursoId
          ? this.checkFormChanged()
          : this.cursoForm.valid;
      });
    }

    checkFormChanged(): boolean {
      if (!this.editandoCursoId) return false;
      const curso = this.cursos.find((c: any) => c.id === this.editandoCursoId);
      if (!curso) return false;
      const formValue = this.cursoForm.value;
      return (
        formValue.titulo !== curso.titulo ||
        formValue.slug !== curso.slug ||
        formValue.descripcion !== curso.descripcion ||
        formValue.urlImagen !== curso.urlImagen ||
        formValue.nivel !== curso.nivel ||
        formValue.duracionHoras !== curso.duracionHoras ||
        formValue.puntajeMaximo !== curso.puntajeMaximo ||
        formValue.instructorId !== (curso.instructor?.id || this.instructorId)
      ) && this.cursoForm.valid;
    }
  editandoCursoId: number | null = null;
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
    this.editandoCursoId = null;
    this.formChanged = false;
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
    if (this.editandoCursoId) {
      this.usuarioService.actualizarCurso(this.editandoCursoId, cursoPayload).subscribe({
        next: (curso) => {
          this.successMsg = 'Curso actualizado correctamente';
          this.showForm = false;
          this.cargarCursos();
          this.loading = false;
          this.editandoCursoId = null;
        },
        error: (err) => {
          this.errorMsg = 'Error al actualizar curso';
          this.loading = false;
        }
      });
    } else {
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
  }
  editarCurso(curso: any) {
    this.showForm = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.editandoCursoId = curso.id;
    this.cursoForm.patchValue({
      titulo: curso.titulo,
      slug: curso.slug,
      descripcion: curso.descripcion,
      urlImagen: curso.urlImagen,
      nivel: curso.nivel,
      duracionHoras: curso.duracionHoras,
      puntajeMaximo: curso.puntajeMaximo,
      instructorId: curso.instructor?.id || this.instructorId
    });
    this.formChanged = false;
  }
  eliminarCurso(cursoId: number) {
    if (!confirm('¿Seguro que deseas eliminar este curso?')) return;
    this.loading = true;
    this.usuarioService.eliminarCurso(cursoId).subscribe({
      next: () => {
        this.successMsg = 'Curso eliminado correctamente';
        this.cargarCursos();
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Error al eliminar curso';
        this.loading = false;
      }
    });
  }
}
