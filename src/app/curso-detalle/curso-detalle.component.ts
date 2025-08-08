import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Actividad {
  id: number;
  tipo: 'lectura' | 'preguntas' | 'examen';
  titulo: string;
  descripcion: string;
  contenido?: string;
  preguntas?: any[];
}

interface CursoEstatico {
  id: string;
  titulo: string;
  descripcion: string;
  actividades: Actividad[];
}

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css'],
  imports: [CommonModule]
})
export class CursoDetalleComponent implements OnInit {
  curso: CursoEstatico | null = null;
  loading = true;
  errorMsg: string | null = null;

  // Cursos estáticos (mismos que en curso-list)
  cursosEstaticos: CursoEstatico[] = [
    {
      id: 'tecnologia',
      titulo: 'Introducción a la Tecnología',
      descripcion: 'Aprende los fundamentos de la tecnología moderna',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'Fundamentos de la Tecnología',
          descripcion: 'Conoce los conceptos básicos de la tecnología',
          contenido: `
            <h2>¿Qué es la Tecnología?</h2>
            <p>La tecnología es el conjunto de conocimientos, técnicas y procesos que utilizamos para crear herramientas, máquinas y sistemas que nos ayudan a resolver problemas y mejorar nuestra vida diaria.</p>
            
            <h3>Historia de la Tecnología</h3>
            <p>La tecnología ha evolucionado desde las primeras herramientas de piedra hasta los dispositivos digitales modernos. Algunos hitos importantes incluyen:</p>
            <ul>
              <li><strong>Prehistoria:</strong> Herramientas de piedra y fuego</li>
              <li><strong>Antigüedad:</strong> Rueda, escritura y metalurgia</li>
              <li><strong>Revolución Industrial:</strong> Máquinas de vapor y electricidad</li>
              <li><strong>Era Digital:</strong> Computadoras, internet y smartphones</li>
            </ul>
            
            <h3>Tipos de Tecnología</h3>
            <p>Existen diferentes categorías de tecnología:</p>
            <ul>
              <li><strong>Tecnología de la Información:</strong> Computadoras, software, internet</li>
              <li><strong>Tecnología de Comunicación:</strong> Teléfonos, radio, televisión</li>
              <li><strong>Tecnología Médica:</strong> Equipos de diagnóstico, prótesis</li>
              <li><strong>Tecnología de Transporte:</strong> Automóviles, aviones, trenes</li>
              <li><strong>Tecnología Verde:</strong> Energías renovables, reciclaje</li>
            </ul>
            
            <h3>Impacto de la Tecnología</h3>
            <p>La tecnología ha transformado nuestras vidas en muchas formas:</p>
            <ul>
              <li>Facilita la comunicación global</li>
              <li>Mejora la medicina y la salud</li>
              <li>Aumenta la eficiencia en el trabajo</li>
              <li>Proporciona entretenimiento y educación</li>
              <li>Ayuda a resolver problemas complejos</li>
            </ul>
            
            <p>Es importante entender tanto los beneficios como los desafíos que presenta la tecnología para poder usarla de manera responsable.</p>
          `
        },
        {
          id: 2,
          tipo: 'preguntas',
          titulo: 'Evaluación: Fundamentos de Tecnología',
          descripcion: 'Responde estas preguntas sobre la lectura anterior',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la tecnología?',
              opciones: [
                'Solo las computadoras y dispositivos digitales',
                'El conjunto de conocimientos y técnicas para crear herramientas que resuelven problemas',
                'Únicamente los inventos modernos',
                'Solo las máquinas industriales'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La tecnología es el conjunto de conocimientos, técnicas y procesos que utilizamos para crear herramientas y sistemas que nos ayudan a resolver problemas.'
            },
            {
              id: 2,
              pregunta: '¿Cuál fue una de las primeras tecnologías de la prehistoria?',
              opciones: [
                'La electricidad',
                'Las herramientas de piedra y el fuego',
                'Los automóviles',
                'Las computadoras'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las herramientas de piedra y el dominio del fuego fueron algunas de las primeras tecnologías desarrolladas por los humanos.'
            },
            {
              id: 3,
              pregunta: '¿Qué caracterizó la Revolución Industrial?',
              opciones: [
                'El desarrollo de internet',
                'La invención de la rueda',
                'Las máquinas de vapor y la electricidad',
                'Los smartphones'
              ],
              respuestaCorrecta: 2,
              explicacion: 'La Revolución Industrial se caracterizó por el desarrollo de máquinas de vapor, electricidad y la mecanización de la producción.'
            },
            {
              id: 4,
              pregunta: '¿Cuál de estos NO es un tipo de tecnología mencionado?',
              opciones: [
                'Tecnología de la Información',
                'Tecnología Médica',
                'Tecnología Gastronómica',
                'Tecnología Verde'
              ],
              respuestaCorrecta: 2,
              explicacion: 'La Tecnología Gastronómica no fue mencionada en la lectura como uno de los tipos principales de tecnología.'
            },
            {
              id: 5,
              pregunta: '¿Qué incluye la tecnología de comunicación?',
              opciones: [
                'Solo computadoras',
                'Teléfonos, radio y televisión',
                'Solo internet',
                'Únicamente smartphones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La tecnología de comunicación incluye teléfonos, radio, televisión y otros medios de comunicación.'
            },
            {
              id: 6,
              pregunta: '¿Cuál es un ejemplo de tecnología verde?',
              opciones: [
                'Automóviles de gasolina',
                'Energías renovables',
                'Televisores antiguos',
                'Máquinas de vapor'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las energías renovables son un ejemplo de tecnología verde que busca reducir el impacto ambiental.'
            },
            {
              id: 7,
              pregunta: '¿Cómo ha impactado la tecnología en la medicina?',
              opciones: [
                'No ha tenido impacto',
                'Solo ha complicado los procedimientos',
                'Ha mejorado la medicina y la salud',
                'Solo afecta a los hospitales grandes'
              ],
              respuestaCorrecta: 2,
              explicacion: 'La tecnología ha mejorado significativamente la medicina y la salud con nuevos equipos de diagnóstico y tratamientos.'
            },
            {
              id: 8,
              pregunta: '¿Qué era Digital se caracteriza por?',
              opciones: [
                'Máquinas de vapor',
                'Herramientas de piedra',
                'Computadoras, internet y smartphones',
                'Solo la electricidad'
              ],
              respuestaCorrecta: 2,
              explicacion: 'La Era Digital se caracteriza por el desarrollo de computadoras, internet, smartphones y tecnologías digitales.'
            },
            {
              id: 9,
              pregunta: '¿Por qué es importante entender tanto los beneficios como los desafíos de la tecnología?',
              opciones: [
                'Para evitar usar tecnología',
                'Para poder usarla de manera responsable',
                'No es importante entender los desafíos',
                'Solo necesitamos conocer los beneficios'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Es importante entender tanto beneficios como desafíos para poder usar la tecnología de manera responsable y consciente.'
            },
            {
              id: 10,
              pregunta: '¿Cuál de estos es un beneficio de la tecnología moderna?',
              opciones: [
                'Complica la comunicación',
                'Facilita la comunicación global',
                'Reduce la eficiencia en el trabajo',
                'Limita el acceso a la información'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La tecnología moderna facilita la comunicación global, permitiendo conectar personas de todo el mundo instantáneamente.'
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loading = true;
      
      // Buscar curso estático por ID/slug
      const cursoEncontrado = this.cursosEstaticos.find(curso => curso.id === slug);
      
      if (cursoEncontrado) {
        this.curso = cursoEncontrado;
        this.loading = false;
      } else {
        this.errorMsg = 'Curso no encontrado.';
        this.loading = false;
      }
    } else {
      this.errorMsg = 'Curso no encontrado.';
      this.loading = false;
    }
  }

  iconoNivel(tipo: Actividad['tipo']) {
    switch (tipo) {
      case 'lectura': return 'bi bi-book text-primary';
      case 'preguntas': return 'bi bi-question-circle text-warning';
      case 'examen': return 'bi bi-clipboard-check text-success';
      default: return 'bi bi-journal';
    }
  }

volver() {
  this.router.navigate(['/cursos']);
}

  verNivel(cursoId: string, actividadId: number) {
    this.router.navigate([
      '/cursos', cursoId, 'actividad', actividadId
    ]);
  }

  irACursoForm(actividad: Actividad) {
    this.router.navigate(['/curso-form'], {
      queryParams: {
        tipo: actividad.tipo,
        titulo: actividad.titulo,
        descripcion: actividad.descripcion
      },
      state: { actividad }
    });
  }

  verActividad(actividadId: number) {
    console.log('verActividad llamado con ID:', actividadId); // Debug
    
    if (this.curso) {
      // Buscar la actividad por ID
      const actividad = this.curso.actividades.find(act => act.id === actividadId);
      console.log('Actividad encontrada:', actividad); // Debug
      
      if (actividad) {
        console.log('Navegando con parámetros:', {
          tipo: actividad.tipo,
          titulo: actividad.titulo,
          descripcion: actividad.descripcion,
          cursoId: this.curso.id,
          actividadId: actividad.id
        }); // Debug
        
        this.router.navigate(['/curso-form'], {
          queryParams: {
            tipo: actividad.tipo,
            titulo: actividad.titulo,
            descripcion: actividad.descripcion,
            cursoId: this.curso.id,
            actividadId: actividad.id // Agregamos el ID para poder buscar la actividad
          },
          state: { actividad }
        });
      }
    }
  }
}
