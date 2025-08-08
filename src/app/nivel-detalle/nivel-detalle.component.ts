import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Curso {
  id: number;
  titulo: string;
  slug: string;
  descripcion: string;
  urlImagen: string;
  temas: string[]; // <--- SOLO un array de string
  instructor: { id: number; nombre: string };
  fechaCreacion: string;
  nivel: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
  duracionHoras: number;
  puntajeMaximo: number;
  estado: 'ACTIVO' | 'BORRADOR';
}

@Component({
  selector: 'app-nivel-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nivel-detalle.component.html',
  styleUrls: ['./nivel-detalle.component.css']
})
export class NivelDetalleComponent implements OnInit {
  cursoId = '';
  temaIndex = 0;
  curso: Curso | null = null;
  temaNombre = '';
  loading = true;
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('cursoId') || '';
    this.temaIndex = +(this.route.snapshot.paramMap.get('temaIndex') || 0);

    this.http.get<Curso>(`http://localhost:8080/api/cursos/id/${this.cursoId}`)
      .subscribe({
        next: (curso) => {
          this.curso = curso;
          this.temaNombre = curso.temas && curso.temas[this.temaIndex] ? curso.temas[this.temaIndex] : 'Tema no encontrado';
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'No se pudo cargar el curso o el tema.';
          this.loading = false;
        }
      });
  }

  irACursoForm() {
    // Aquí podrías pasar el nombre del tema como título, si quieres
    this.router.navigate(['/curso-form'], {
      queryParams: {
        titulo: this.temaNombre
      }
    });
  }

  volverAlCurso() {
    if (this.curso) {
      this.router.navigate(['/cursos', this.curso.slug]);
    } else {
      this.router.navigate(['/cursos']);
    }
  }
}
