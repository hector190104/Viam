import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Actividad {
  id: number;
  tipo: string; // Cambio a string para que sea más flexible
  titulo: string;
  descripcion: string;
  contenido?: string;
  preguntas?: any[];
}

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent {
  tipo: string | null = null;
  titulo: string | null = null;
  descripcion: string | null = null;
  actividad: Actividad | null = null;

  aciertos = 0;
  totalPreguntas = 0;
  mostrarResultados = false;
  cursoId: string | null = null;

  respuestas: number[] = []; // Para registrar respuestas seleccionadas

  // Datos estáticos (mismos que en curso-detalle)
  cursosEstaticos = [
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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      this.titulo = params['titulo'];
      this.descripcion = params['descripcion'];
      this.cursoId = params['cursoId'] || null;
      
      // Si no tenemos actividad del state, crear una básica con la información disponible
      const actividadId = params['actividadId'];
      
      // Obtener actividad del state
      const nav = window.history.state;
      console.log('State navigation:', nav); // Debug
      
      if (nav && nav.actividad) {
        console.log('Actividad desde state:', nav.actividad); // Debug
        this.actividad = nav.actividad;
        if (this.actividad?.preguntas) {
          this.respuestas = Array(this.actividad.preguntas.length).fill(-1);
          this.totalPreguntas = this.actividad.preguntas.length;
        }
      } else if (actividadId && this.cursoId) {
        console.log('Buscando actividad estática:', this.cursoId, actividadId); // Debug
        // Fallback: buscar la actividad en los datos estáticos
        this.buscarActividadEstatica(this.cursoId, parseInt(actividadId));
      } else {
        // Último fallback: crear actividad básica con la información disponible
        console.log('Creando actividad básica con tipo:', this.tipo); // Debug
        this.crearActividadBasica();
      }
      
      console.log('Actividad final:', this.actividad); // Debug
    });
  }

  seleccionarRespuesta(preguntaIdx: number, opcionIdx: number) {
    this.respuestas[preguntaIdx] = opcionIdx;
  }

  finalizarActividad() {
    if (!this.actividad?.preguntas) return;
    
    let aciertos = 0;
    this.actividad.preguntas.forEach((pregunta: any, idx: number) => {
      if (this.respuestas[idx] === pregunta.respuestaCorrecta) {
        aciertos++;
      }
    });
    this.aciertos = aciertos;
    this.mostrarResultados = true;
  }

  volverAlCurso() {
    if (this.cursoId) {
      this.router.navigate(['/cursos', this.cursoId]);
    } else {
      window.history.back();
    }
  }

  reiniciarActividad() {
    if (this.actividad && this.actividad.preguntas) {
      this.respuestas = Array(this.actividad.preguntas.length).fill(-1);
      this.mostrarResultados = false;
      this.aciertos = 0;
    }
  }

  // Métodos auxiliares para el template
  getProgreso(): number {
    if (!this.respuestas || this.totalPreguntas === 0) return 0;
    const respondidas = this.respuestas.filter(r => r !== -1).length;
    return (respondidas / this.totalPreguntas) * 100;
  }

  getRespuestasCompletadas(): number {
    if (!this.respuestas) return 0;
    return this.respuestas.filter(r => r !== -1).length;
  }

  getPorcentajeAciertos(): number {
    if (this.totalPreguntas === 0) return 0;
    return (this.aciertos / this.totalPreguntas) * 100;
  }

  esAprobado(): boolean {
    return this.aciertos >= this.totalPreguntas * 0.7;
  }

  // Método para buscar actividad estática como fallback
  buscarActividadEstatica(cursoId: string, actividadId: number) {
    console.log('Buscando en cursosEstaticos:', this.cursosEstaticos); // Debug
    const curso = this.cursosEstaticos.find(c => c.id === cursoId);
    console.log('Curso encontrado:', curso); // Debug
    
    if (curso) {
      const actividad = curso.actividades.find(act => act.id === actividadId);
      console.log('Actividad encontrada:', actividad); // Debug
      
      if (actividad) {
        this.actividad = actividad as Actividad;
        if (this.actividad && this.actividad.preguntas) {
          this.respuestas = Array(this.actividad.preguntas.length).fill(-1);
          this.totalPreguntas = this.actividad.preguntas.length;
          console.log('Preguntas configuradas:', this.totalPreguntas); // Debug
        }
      }
    }
  }

  // Crear actividad básica cuando no hay datos completos
  crearActividadBasica() {
    if (this.tipo === 'lectura') {
      this.actividad = {
        id: 1,
        tipo: 'lectura',
        titulo: this.titulo || 'Lectura',
        descripcion: this.descripcion || '',
        contenido: this.obtenerContenidoTecnologia() // Usar el contenido estático
      };
    } else if (this.tipo === 'preguntas') {
      this.actividad = {
        id: 2,
        tipo: 'preguntas',
        titulo: this.titulo || 'Evaluación',
        descripcion: this.descripcion || '',
        preguntas: this.obtenerPreguntasTecnologia() // Usar las preguntas estáticas
      };
      
      if (this.actividad.preguntas) {
        this.respuestas = Array(this.actividad.preguntas.length).fill(-1);
        this.totalPreguntas = this.actividad.preguntas.length;
      }
    }
  }

  // Obtener contenido estático de tecnología
  obtenerContenidoTecnologia(): string {
    return `
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
    `;
  }

  // Obtener preguntas estáticas de tecnología
  obtenerPreguntasTecnologia(): any[] {
    return [
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
    ];
  }
}
