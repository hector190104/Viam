import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule, SafeUrlPipe]
})
export class CursoListComponent {
  loadingCurso: string | null = null;

  // Propiedades para el modal de actividades
  mostrarModal = false;
  cursoSeleccionado: any = null;
  actividadActiva: any = null;
  respuestas: number[] = [];
  mostrarResultados = false;
  aciertos = 0;

  constructor(private router: Router) { }

  // Cursos estáticos con actividades
  cursosEstaticos = [
    {
      id: 'tecnologia',
      titulo: 'Tecnología',
      descripcion: 'Aprende los fundamentos de la tecnología moderna',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'Fundamentos de la Tecnología',
          descripcion: 'Conoce los conceptos básicos de la tecnología',
          videoUrl: 'https://www.youtube.com/embed/drvZxBCcfGA'
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
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Inteligencia Artificial y Machine Learning',
          descripcion: 'Descubre cómo la IA está transformando nuestro mundo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 4,
          tipo: 'preguntas',
          titulo: 'Evaluación: Inteligencia Artificial',
          descripcion: 'Responde sobre la IA y Machine Learning',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la Inteligencia Artificial?',
              opciones: [
                'Solo robots humanoides',
                'Tecnología que busca crear máquinas capaces de realizar tareas que requieren inteligencia humana',
                'Únicamente videojuegos',
                'Solo computadoras muy rápidas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La IA es una rama de la tecnología que busca crear máquinas y sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es un ejemplo de IA Débil?',
              opciones: [
                'Un robot que puede hacer cualquier trabajo humano',
                'Siri o Alexa',
                'Una superinteligencia',
                'Un humano muy inteligente'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los asistentes virtuales como Siri o Alexa son ejemplos de IA Débil porque están especializados en tareas específicas.'
            },
            {
              id: 3,
              pregunta: '¿Qué característica NO pertenece al Machine Learning?',
              opciones: [
                'Aprenden de los datos',
                'Requieren ser programadas explícitamente para cada tarea',
                'Mejoran su rendimiento con la experiencia',
                'Encuentran patrones en información'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Una característica clave del Machine Learning es que las máquinas aprenden sin ser programadas explícitamente para cada tarea específica.'
            },
            {
              id: 4,
              pregunta: '¿En cuál área la IA ayuda con diagnósticos por imágenes?',
              opciones: [
                'Entretenimiento',
                'Medicina',
                'Redes sociales',
                'Transporte'
              ],
              respuestaCorrecta: 1,
              explicacion: 'En medicina, la IA está ayudando con diagnósticos por imágenes y descubrimiento de medicamentos.'
            },
            {
              id: 5,
              pregunta: '¿Qué tipo de aprendizaje NO se menciona en Machine Learning?',
              opciones: [
                'Aprendizaje supervisado',
                'Aprendizaje emocional',
                'Aprendizaje no supervisado',
                'Aprendizaje por refuerzo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los tipos mencionados son aprendizaje supervisado, no supervisado y por refuerzo. El aprendizaje emocional no se menciona.'
            }
          ]
        },
        {
          id: 5,
          tipo: 'lectura',
          titulo: 'Internet y Comunicaciones Digitales',
          descripcion: 'Comprende cómo funciona la red mundial de información',
          videoUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4g'
        },
        {
          id: 6,
          tipo: 'preguntas',
          titulo: 'Evaluación: Internet y Comunicaciones',
          descripcion: 'Responde sobre internet y comunicaciones digitales',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es Internet?',
              opciones: [
                'Una computadora muy grande',
                'Una red global de computadoras interconectadas',
                'Solo sitios web',
                'Un programa de computadora'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Internet es una red global de computadoras interconectadas que permite el intercambio de información y comunicación mundial.'
            },
            {
              id: 2,
              pregunta: '¿Cuál fue el precursor de Internet en los años 1960s?',
              opciones: [
                'World Wide Web',
                'ARPANET',
                'Facebook',
                'Google'
              ],
              respuestaCorrecta: 1,
              explicacion: 'ARPANET fue la primera red de computadoras y el precursor de lo que hoy conocemos como Internet.'
            },
            {
              id: 3,
              pregunta: '¿Qué función cumple el DNS en Internet?',
              opciones: [
                'Almacenar sitios web',
                'Traducir nombres web a direcciones IP',
                'Enviar correos electrónicos',
                'Crear páginas web'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El DNS (Sistema de Nombres de Dominio) traduce nombres web legibles como google.com a direcciones IP numéricas.'
            },
            {
              id: 4,
              pregunta: '¿Cuál NO es un servicio típico de Internet?',
              opciones: [
                'Correo electrónico',
                'Reparación de computadoras',
                'Streaming de video',
                'Redes sociales'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La reparación de computadoras es un servicio físico que no se realiza a través de Internet.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es una buena práctica de seguridad en Internet?',
              opciones: [
                'Compartir contraseñas con amigos',
                'Usar contraseñas seguras y únicas',
                'Dar información personal a cualquier sitio web',
                'Nunca actualizar el software'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Usar contraseñas seguras y únicas para cada cuenta es una práctica fundamental de seguridad en Internet.'
            }
          ]
        },
        {
          id: 7,
          tipo: 'lectura',
          titulo: 'Programación y Desarrollo de Software',
          descripcion: 'Introducción al mundo de la programación y creación de aplicaciones',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 8,
          tipo: 'preguntas',
          titulo: 'Evaluación: Programación y Software',
          descripcion: 'Responde sobre programación y desarrollo de software',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la programación?',
              opciones: [
                'Reparar computadoras',
                'Crear instrucciones que las computadoras pueden seguir',
                'Diseñar páginas web bonitas',
                'Solo usar aplicaciones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La programación es el proceso de crear instrucciones detalladas que las computadoras pueden seguir para realizar tareas específicas.'
            },
            {
              id: 2,
              pregunta: '¿Cuál lenguaje de programación se menciona como perfecto para principiantes?',
              opciones: [
                'C++',
                'Scratch',
                'Java',
                'JavaScript'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Scratch es un lenguaje visual que se menciona como perfecto para principiantes porque es fácil de entender.'
            },
            {
              id: 3,
              pregunta: '¿Qué son las variables en programación?',
              opciones: [
                'Errores en el código',
                'Espacios para guardar información',
                'Tipos de computadoras',
                'Lenguajes de programación'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las variables son espacios en la memoria donde se puede guardar y manipular información durante la ejecución del programa.'
            },
            {
              id: 4,
              pregunta: '¿Cuál NO es un tipo de software mencionado?',
              opciones: [
                'Aplicaciones móviles',
                'Hardware de computadora',
                'Videojuegos',
                'Sitios web'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El hardware de computadora son componentes físicos, no software que se programa.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es el primer paso en el proceso de desarrollo de software?',
              opciones: [
                'Escribir el código',
                'Planificar qué problema resolver',
                'Probar el software',
                'Lanzar la aplicación'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El primer paso es planificar qué problema se va a resolver, antes de diseñar y programar la solución.'
            }
          ]
        },
        {
          id: 9,
          tipo: 'lectura',
          titulo: 'Robótica y Automatización',
          descripcion: 'Descubre el fascinante mundo de los robots y la automatización',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 10,
          tipo: 'preguntas',
          titulo: 'Evaluación: Robótica y Automatización',
          descripcion: 'Responde sobre robots y automatización',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la robótica?',
              opciones: [
                'Solo videojuegos de robots',
                'La rama de la tecnología que se ocupa del diseño y construcción de robots',
                'Reparar computadoras',
                'Solo películas de ciencia ficción'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La robótica es la rama de la tecnología que se ocupa del diseño, construcción, operación y uso de robots.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es la función de los sensores en un robot?',
              opciones: [
                'Hacer que el robot se mueva',
                'Recoger información del entorno',
                'Almacenar datos',
                'Dar energía al robot'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los sensores recogen información del entorno, como cámaras que ven o micrófonos que escuchan.'
            },
            {
              id: 3,
              pregunta: '¿Cuál de estos NO es un tipo de robot mencionado?',
              opciones: [
                'Robots industriales',
                'Robots domésticos',
                'Robots médicos',
                'Drones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los tipos mencionados son industriales, de servicio, médicos, exploradores, humanoides y drones. "Robots domésticos" no se menciona específicamente.'
            },
            {
              id: 4,
              pregunta: '¿Cuál es un ejemplo de automatización en la vida cotidiana?',
              opciones: [
                'Escribir a mano',
                'Cajeros automáticos',
                'Caminar',
                'Leer un libro'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los cajeros automáticos son un ejemplo de automatización porque realizan transacciones bancarias sin intervención humana directa.'
            },
            {
              id: 5,
              pregunta: '¿Qué campos combina la robótica según el texto?',
              opciones: [
                'Solo ingeniería',
                'Ingeniería, programación e inteligencia artificial',
                'Solo programación',
                'Solo inteligencia artificial'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La robótica combina ingeniería, programación e inteligencia artificial para crear máquinas que pueden ayudar y colaborar con los humanos.'
            }
          ]
        }
      ]
    },
    {
      id: 'ciencias',
      titulo: 'Ciencias',
      descripcion: 'Explora el fascinante mundo de la ciencia',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'El Método Científico',
          descripcion: 'Aprende cómo los científicos investigan el mundo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 2,
          tipo: 'preguntas',
          titulo: 'Evaluación: Método Científico',
          descripcion: 'Responde sobre lo que aprendiste',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Cuál es el primer paso del método científico?',
              opciones: [
                'Hacer un experimento',
                'Observación',
                'Formar una hipótesis',
                'Sacar conclusiones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El primer paso del método científico es la observación, donde notamos algo interesante en la naturaleza.'
            },
            {
              id: 2,
              pregunta: '¿Qué estudia la biología?',
              opciones: [
                'Las rocas y minerales',
                'Los seres vivos',
                'El espacio',
                'Los números'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La biología es la rama de la ciencia que estudia los seres vivos, como plantas, animales y microorganismos.'
            },
            {
              id: 3,
              pregunta: '¿Qué propone una hipótesis en el método científico?',
              opciones: [
                'Una pregunta',
                'Una posible respuesta',
                'Un experimento',
                'Una conclusión final'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Una hipótesis propone una posible respuesta o explicación a la pregunta formulada sobre lo observado.'
            },
            {
              id: 4,
              pregunta: '¿Qué estudia la física?',
              opciones: [
                'Los seres vivos',
                'El movimiento, energía y fuerzas',
                'Las rocas',
                'Los planetas únicamente'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La física estudia el movimiento, la energía, las fuerzas y las leyes que gobiernan el comportamiento de la materia.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es el objetivo principal de la ciencia?',
              opciones: [
                'Ganar dinero',
                'Entender cómo funciona el mundo que nos rodea',
                'Solo hacer experimentos',
                'Crear teorías complicadas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El objetivo principal de la ciencia es entender cómo funciona el mundo natural que nos rodea mediante observación y experimentación.'
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Los Seres Vivos y la Biodiversidad',
          descripcion: 'Descubre la increíble variedad de vida en la Tierra',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 4,
          tipo: 'preguntas',
          titulo: 'Evaluación: Seres Vivos y Biodiversidad',
          descripcion: 'Responde sobre los seres vivos y la biodiversidad',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Cuál NO es una característica de los seres vivos?',
              opciones: [
                'Crecimiento',
                'Ser de color verde',
                'Reproducción',
                'Metabolismo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El color no es una característica universal de los seres vivos. Las características fundamentales son crecimiento, reproducción, metabolismo, respuesta al ambiente, organización y homeostasis.'
            },
            {
              id: 2,
              pregunta: '¿Qué significa metabolismo?',
              opciones: [
                'Cambiar de color',
                'Transformar alimentos en energía',
                'Moverse rápidamente',
                'Vivir bajo el agua'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El metabolismo es el proceso por el cual los seres vivos transforman los alimentos en energía que pueden usar para sus funciones vitales.'
            },
            {
              id: 3,
              pregunta: '¿Cómo se alimentan las plantas?',
              opciones: [
                'Comen otros animales',
                'Fabrican su propio alimento usando el sol',
                'Comen solo hongos',
                'No necesitan alimentarse'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las plantas fabrican su propio alimento mediante la fotosíntesis, usando la luz del sol, agua y dióxido de carbono.'
            },
            {
              id: 4,
              pregunta: '¿Qué es la biodiversidad?',
              opciones: [
                'Solo los animales grandes',
                'La variedad de vida en la Tierra',
                'Solo las plantas',
                'Solo los océanos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La biodiversidad es la variedad de vida en la Tierra, incluyendo todos los tipos de plantas, animales, hongos y microorganismos.'
            },
            {
              id: 5,
              pregunta: '¿Qué forman los seres vivos cuando interactúan en un ambiente?',
              opciones: [
                'Ciudades',
                'Ecosistemas',
                'Computadoras',
                'Máquinas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los seres vivos forman ecosistemas cuando interactúan entre sí y con su ambiente, como bosques, océanos y desiertos.'
            }
          ]
        },
        {
          id: 5,
          tipo: 'lectura',
          titulo: 'La Materia y sus Estados',
          descripcion: 'Explora los diferentes estados de la materia',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 6,
          tipo: 'preguntas',
          titulo: 'Evaluación: Materia y Estados',
          descripcion: 'Responde sobre la materia y sus estados',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la materia?',
              opciones: [
                'Solo las cosas que brillan',
                'Todo lo que ocupa espacio y tiene masa',
                'Solo los líquidos',
                'Solo las cosas invisibles'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La materia es todo lo que ocupa espacio y tiene masa, incluyendo sólidos, líquidos y gases.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es una característica del estado líquido?',
              opciones: [
                'Tiene forma y volumen definidos',
                'Tiene volumen definido pero toma la forma del recipiente',
                'No tiene forma ni volumen definidos',
                'Solo existe en el espacio'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los líquidos tienen volumen definido pero adoptan la forma del recipiente que los contiene.'
            },
            {
              id: 3,
              pregunta: '¿Cómo se llama el cambio de líquido a gas?',
              opciones: [
                'Fusión',
                'Vaporización',
                'Condensación',
                'Solidificación'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La vaporización es el proceso por el cual un líquido se convierte en gas, como cuando el agua hierve.'
            },
            {
              id: 4,
              pregunta: '¿Qué es la densidad?',
              opciones: [
                'El color de un objeto',
                'La relación entre masa y volumen',
                'Solo el peso',
                'La temperatura'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La densidad es la relación entre la masa de un objeto y el volumen que ocupa.'
            },
            {
              id: 5,
              pregunta: '¿Cómo están las partículas en un gas?',
              opciones: [
                'Muy juntas y organizadas',
                'Separadas y moviéndose libremente',
                'Juntas pero inmóviles',
                'No existen partículas en los gases'
              ],
              respuestaCorrecta: 1,
              explicacion: 'En los gases, las partículas están separadas unas de otras y se mueven libremente en todas las direcciones.'
            }
          ]
        },
        {
          id: 7,
          tipo: 'lectura',
          titulo: 'Las Fuerzas y el Movimiento',
          descripcion: 'Comprende cómo se mueven los objetos en nuestro mundo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 8,
          tipo: 'preguntas',
          titulo: 'Evaluación: Fuerzas y Movimiento',
          descripcion: 'Responde sobre fuerzas y movimiento',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es una fuerza?',
              opciones: [
                'Solo el peso de los objetos',
                'Una acción que puede cambiar el estado de movimiento de un objeto',
                'Solo la velocidad',
                'El color de los objetos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Una fuerza es una acción que puede cambiar el estado de movimiento de un objeto, haciéndolo mover, detenerse o cambiar de dirección.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es la fuerza que nos mantiene en la Tierra?',
              opciones: [
                'Fricción',
                'Gravedad',
                'Magnetismo',
                'Electricidad'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La gravedad es la fuerza que nos mantiene pegados a la superficie de la Tierra y atrae todos los objetos hacia abajo.'
            },
            {
              id: 3,
              pregunta: '¿Qué dice la primera ley de Newton (inercia)?',
              opciones: [
                'Los objetos siempre se mueven',
                'Los objetos en reposo tienden a quedarse en reposo',
                'Solo los objetos pesados se mueven',
                'No existe el movimiento'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La primera ley de Newton dice que los objetos en reposo tienden a quedarse en reposo, y los en movimiento a seguir moviéndose, a menos que una fuerza los detenga.'
            },
            {
              id: 4,
              pregunta: '¿Qué tipo de fuerza se opone al movimiento?',
              opciones: [
                'Gravedad',
                'Fricción',
                'Magnetismo',
                'Muscular'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La fricción es la fuerza que se opone al movimiento, como cuando frenamos una bicicleta o caminamos sobre el suelo.'
            },
            {
              id: 5,
              pregunta: '¿Por qué flotan los astronautas en el espacio?',
              opciones: [
                'No hay aire',
                'Hay menos gravedad',
                'Están muy lejos',
                'Usan trajes especiales'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los astronautas flotan en el espacio porque hay mucha menos gravedad que en la Tierra, lo que les permite flotar libremente.'
            }
          ]
        },
        {
          id: 9,
          tipo: 'lectura',
          titulo: 'El Sistema Solar y el Universo',
          descripcion: 'Explora el espacio y descubre nuestro lugar en el universo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 10,
          tipo: 'preguntas',
          titulo: 'Evaluación: Sistema Solar y Universo',
          descripcion: 'Responde sobre el espacio y nuestro universo',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es el Sol?',
              opciones: [
                'Un planeta muy grande',
                'Una estrella gigante de gas muy caliente',
                'Una luna brillante',
                'Una roca espacial'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El Sol es una estrella gigante de gas muy caliente que nos proporciona luz y calor, y es el centro de nuestro Sistema Solar.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es el planeta más cercano al Sol?',
              opciones: [
                'Venus',
                'Mercurio',
                'Tierra',
                'Marte'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Mercurio es el planeta más cercano al Sol y por eso es extremadamente caliente durante el día.'
            },
            {
              id: 3,
              pregunta: '¿Por qué Saturno es famoso?',
              opciones: [
                'Por ser el más grande',
                'Por sus hermosos anillos',
                'Por ser el más frío',
                'Por tener más lunas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Saturno es famoso por sus hermosos y distintivos anillos hechos de hielo y rocas que orbitan alrededor del planeta.'
            },
            {
              id: 4,
              pregunta: '¿Cada cuánto orbita la Luna alrededor de la Tierra?',
              opciones: [
                '7 días',
                '28 días',
                '365 días',
                '1 día'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La Luna orbita alrededor de la Tierra cada 28 días aproximadamente, que es lo que llamamos un mes lunar.'
            },
            {
              id: 5,
              pregunta: '¿Cómo se llama nuestra galaxia?',
              opciones: [
                'Andrómeda',
                'Vía Láctea',
                'Sistema Solar',
                'Universo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Nuestra galaxia se llama Vía Láctea y contiene aproximadamente 100 mil millones de estrellas, incluyendo nuestro Sol.'
            }
          ]
        }
      ]
    },
    {
      id: 'ingenieria',
      titulo: 'Ingeniería',
      descripcion: 'Construye, diseña y resuelve problemas con proyectos de ingeniería',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'Fundamentos de la Ingeniería',
          descripcion: 'Aprende qué es la ingeniería y cómo funciona',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 2,
          tipo: 'preguntas',
          titulo: 'Evaluación: Fundamentos de Ingeniería',
          descripcion: 'Responde sobre los conceptos básicos de ingeniería',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la ingeniería?',
              opciones: [
                'Solo construcción de edificios',
                'El arte y ciencia de aplicar conocimientos para diseñar y construir soluciones',
                'Únicamente reparar máquinas',
                'Solo programación de computadoras'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La ingeniería es el arte y la ciencia de aplicar conocimientos para diseñar, construir y mantener sistemas que mejoren la vida humana.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es el primer paso del proceso de diseño en ingeniería?',
              opciones: [
                'Construir un prototipo',
                'Identificar el problema',
                'Hacer cálculos matemáticos',
                'Probar el diseño'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El primer paso es identificar el problema, definiendo qué necesidad se debe satisfacer.'
            },
            {
              id: 3,
              pregunta: '¿Qué estudia la ingeniería civil?',
              opciones: [
                'Software y aplicaciones',
                'Carreteras, puentes y edificios',
                'Procesos químicos',
                'Máquinas y robots'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La ingeniería civil se enfoca en carreteras, puentes, edificios y otras estructuras de infraestructura.'
            },
            {
              id: 4,
              pregunta: '¿Qué es CAD en ingeniería?',
              opciones: [
                'Un tipo de material',
                'Software de diseño para crear modelos 3D',
                'Una herramienta de medición',
                'Un proceso químico'
              ],
              respuestaCorrecta: 1,
              explicacion: 'CAD (Computer Aided Design) es software de diseño que permite a los ingenieros crear modelos 3D de sus proyectos.'
            },
            {
              id: 5,
              pregunta: '¿Qué combina la ingeniería según el texto?',
              opciones: [
                'Solo matemáticas',
                'Creatividad con conocimiento técnico',
                'Solo ciencia',
                'Solo experiencia práctica'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La ingeniería combina creatividad con conocimiento técnico para crear soluciones innovadoras a los desafíos de la sociedad.'
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Estructuras y Construcción',
          descripcion: 'Descubre cómo se construyen edificios, puentes y más',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 4,
          tipo: 'preguntas',
          titulo: 'Evaluación: Estructuras y Construcción',
          descripcion: 'Responde sobre estructuras y construcción',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué son las estructuras?',
              opciones: [
                'Solo edificios muy altos',
                'Construcciones diseñadas para soportar cargas y resistir fuerzas',
                'Solo puentes',
                'Solo casas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las estructuras son construcciones diseñadas específicamente para soportar cargas y resistir diversas fuerzas de manera segura.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es la función de los cimientos?',
              opciones: [
                'Decorar la estructura',
                'Base que transmite el peso al suelo',
                'Dividir espacios',
                'Dar luz natural'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los cimientos son la base de la estructura y su función es transmitir todo el peso de la construcción al suelo de manera segura.'
            },
            {
              id: 3,
              pregunta: '¿Qué material es fuerte en compresión?',
              opciones: [
                'Vidrio',
                'Concreto',
                'Madera',
                'Ladrillo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El concreto es un material que es especialmente fuerte cuando se le aplica compresión, por eso se usa mucho en cimientos.'
            },
            {
              id: 4,
              pregunta: '¿Cuál NO es un tipo de fuerza que actúa sobre las estructuras?',
              opciones: [
                'Peso propio',
                'Color de la pintura',
                'Viento',
                'Terremotos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El color de la pintura no es una fuerza física que afecte la estabilidad estructural de un edificio.'
            },
            {
              id: 5,
              pregunta: '¿Por qué es importante la seguridad estructural?',
              opciones: [
                'Solo para ahorrar dinero',
                'Para proteger vidas y propiedades',
                'Solo para verse bonito',
                'No es importante'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La seguridad estructural es fundamental para proteger las vidas de las personas que usan las construcciones y sus propiedades.'
            }
          ]
        },
        {
          id: 5,
          tipo: 'lectura',
          titulo: 'Máquinas y Mecanismos',
          descripcion: 'Explora cómo funcionan las máquinas que nos rodean',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 6,
          tipo: 'preguntas',
          titulo: 'Evaluación: Máquinas y Mecanismos',
          descripcion: 'Responde sobre máquinas y mecanismos',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué son las máquinas?',
              opciones: [
                'Solo computadoras',
                'Dispositivos que nos ayudan a realizar trabajo más fácilmente',
                'Solo robots',
                'Solo herramientas eléctricas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las máquinas son dispositivos que nos ayudan a realizar trabajo de manera más fácil, rápida o eficiente.'
            },
            {
              id: 2,
              pregunta: '¿Cuál de estas NO es una máquina simple?',
              opciones: [
                'Palanca',
                'Automóvil',
                'Polea',
                'Cuña'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El automóvil es una máquina compleja que combina varias máquinas simples, no es una máquina simple por sí mismo.'
            },
            {
              id: 3,
              pregunta: '¿Qué es la ventaja mecánica?',
              opciones: [
                'El precio de la máquina',
                'La capacidad de multiplicar fuerza o cambiar dirección',
                'El color de la máquina',
                'El tamaño de la máquina'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La ventaja mecánica es la capacidad de una máquina de multiplicar la fuerza, cambiar su dirección o aumentar la velocidad.'
            },
            {
              id: 4,
              pregunta: '¿Qué tipo de energía usa un automóvil principalmente?',
              opciones: [
                'Solar',
                'Química (combustible)',
                'Eólica',
                'Nuclear'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los automóviles usan principalmente energía química almacenada en combustibles como gasolina o diésel.'
            },
            {
              id: 5,
              pregunta: '¿Por qué ninguna máquina es 100% eficiente?',
              opciones: [
                'Porque son muy caras',
                'Por fricción y pérdidas de energía',
                'Porque son muy grandes',
                'Porque son muy ruidosas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las máquinas pierden eficiencia debido a la fricción entre partes móviles y pérdidas de energía en forma de calor.'
            }
          ]
        },
        {
          id: 7,
          tipo: 'lectura',
          titulo: 'Energía y Recursos',
          descripcion: 'Comprende los diferentes tipos de energía y su uso',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 8,
          tipo: 'preguntas',
          titulo: 'Evaluación: Energía y Recursos',
          descripcion: 'Responde sobre energía y recursos',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es la energía?',
              opciones: [
                'Solo la electricidad',
                'La capacidad de realizar trabajo o producir cambios',
                'Solo el calor',
                'Solo la luz'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La energía es la capacidad de realizar trabajo o producir cambios, y se presenta en muchas formas diferentes.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es un ejemplo de energía cinética?',
              opciones: [
                'Agua en una presa',
                'Un auto en movimiento',
                'Una batería',
                'Comida almacenada'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Un auto en movimiento tiene energía cinética porque es energía asociada con el movimiento.'
            },
            {
              id: 3,
              pregunta: '¿Cuál de estas fuentes de energía es renovable?',
              opciones: [
                'Petróleo',
                'Solar',
                'Gas natural',
                'Carbón'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La energía solar es renovable porque el sol continuará brillando y proporcionando energía por miles de millones de años.'
            },
            {
              id: 4,
              pregunta: '¿Qué dice el principio de conservación de energía?',
              opciones: [
                'La energía siempre aumenta',
                'La energía no se crea ni se destruye, solo se transforma',
                'La energía siempre disminuye',
                'La energía solo existe en las máquinas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El principio de conservación de energía establece que la energía no se crea ni se destruye, solamente se transforma de una forma a otra.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es una forma de usar la energía eficientemente?',
              opciones: [
                'Dejar todas las luces encendidas',
                'Apagar luces cuando no las necesitamos',
                'Usar solo aparatos viejos',
                'No preocuparse por el consumo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Apagar las luces cuando no las necesitamos es una forma simple pero efectiva de usar la energía de manera eficiente.'
            }
          ]
        },
        {
          id: 9,
          tipo: 'lectura',
          titulo: 'Diseño y Resolución de Problemas',
          descripcion: 'Aprende el proceso de pensamiento de los ingenieros',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 10,
          tipo: 'preguntas',
          titulo: 'Evaluación: Diseño y Resolución de Problemas',
          descripcion: 'Responde sobre el proceso de diseño en ingeniería',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Cuál es el primer paso en el proceso de diseño?',
              opciones: [
                'Construir un prototipo',
                'Empatizar (entender las necesidades)',
                'Generar ideas',
                'Probar el diseño'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El primer paso es empatizar, que significa entender las necesidades y problemas de los usuarios para quienes estamos diseñando.'
            },
            {
              id: 2,
              pregunta: '¿Qué es la lluvia de ideas?',
              opciones: [
                'Probar un prototipo',
                'Generar muchas ideas sin juzgar',
                'Construir con materiales',
                'Calcular costos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La lluvia de ideas es una técnica donde se generan muchas ideas de forma libre y creativa, sin juzgarlas inicialmente.'
            },
            {
              id: 3,
              pregunta: '¿Cuál NO es una restricción típica en el diseño?',
              opciones: [
                'Económicas',
                'El color favorito del diseñador',
                'Seguridad',
                'Tiempo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El color favorito del diseñador no es una restricción válida. Las restricciones deben basarse en necesidades reales como economía, seguridad y tiempo.'
            },
            {
              id: 4,
              pregunta: '¿Para qué sirven los prototipos?',
              opciones: [
                'Solo para decoración',
                'Para probar ideas rápidamente y encontrar problemas',
                'Solo para impresionar',
                'Para gastar dinero'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los prototipos sirven para probar ideas rápidamente, encontrar problemas antes de la producción final y mejorar el diseño.'
            },
            {
              id: 5,
              pregunta: '¿Por qué es importante el trabajo en equipo en ingeniería?',
              opciones: [
                'Para hacer más ruido',
                'Diferentes personas aportan diferentes habilidades y generan mejores ideas',
                'Solo para socializar',
                'Para complicar el proceso'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El trabajo en equipo es importante porque diferentes personas aportan habilidades complementarias y juntos pueden generar mejores ideas y resolver problemas más complejos.'
            }
          ]
        }
      ]
    },
    {
      id: 'artes',
      titulo: 'Artes',
      descripcion: 'Explora tu creatividad con música, pintura, teatro y más',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'El Mundo del Arte',
          descripcion: 'Descubre las diferentes formas de expresión artística',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 2,
          tipo: 'preguntas',
          titulo: 'Evaluación: El Mundo del Arte',
          descripcion: 'Responde sobre las diferentes formas artísticas',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es el arte?',
              opciones: [
                'Solo pintar cuadros',
                'Una forma de expresión humana que comunica ideas y emociones',
                'Únicamente música clásica',
                'Solo esculturas en museos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El arte es una forma de expresión humana que utiliza la creatividad para comunicar ideas, emociones y experiencias.'
            },
            {
              id: 2,
              pregunta: '¿Cuál de estos NO es un elemento fundamental del arte?',
              opciones: [
                'Línea',
                'Color',
                'Matemáticas',
                'Textura'
              ],
              respuestaCorrecta: 2,
              explicacion: 'Las matemáticas no son un elemento fundamental del arte, aunque pueden ser útiles en algunas disciplinas artísticas.'
            },
            {
              id: 3,
              pregunta: '¿Qué período artístico incluye a Leonardo da Vinci?',
              opciones: [
                'Arte Prehistórico',
                'Renacimiento',
                'Arte Moderno',
                'Arte Contemporáneo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Leonardo da Vinci fue una figura clave del Renacimiento, junto con Miguel Ángel y otros grandes maestros.'
            },
            {
              id: 4,
              pregunta: '¿Cuál disciplina artística incluye teatro y danza?',
              opciones: [
                'Artes Visuales',
                'Artes Escénicas',
                'Artes Digitales',
                'Artes Aplicadas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las Artes Escénicas incluyen teatro, danza, música y ópera - todas las artes que se presentan ante un público.'
            },
            {
              id: 5,
              pregunta: '¿Cómo está presente el arte en nuestra vida cotidiana?',
              opciones: [
                'Solo en los museos',
                'En decoración, música, diseño y entretenimiento',
                'Solo en las escuelas',
                'Solo en galerías'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El arte está presente en muchos aspectos cotidianos como decoración, música, diseño de productos, moda y entretenimiento.'
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Pintura y Dibujo',
          descripcion: 'Explora las técnicas básicas de pintura y dibujo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 4,
          tipo: 'preguntas',
          titulo: 'Evaluación: Pintura y Dibujo',
          descripcion: 'Responde sobre técnicas de pintura y dibujo',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Cuál es un material común para dibujar sombras dramáticas?',
              opciones: [
                'Lápiz duro (H)',
                'Carboncillo',
                'Marcadores',
                'Lápices de colores'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El carboncillo es ideal para crear sombras dramáticas y texturas ricas debido a su naturaleza suave y oscura.'
            },
            {
              id: 2,
              pregunta: '¿Qué tipo de pintura se mezcla con agua?',
              opciones: [
                'Óleo',
                'Acuarela',
                'Acrílica',
                'Pastel'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La acuarela se caracteriza por ser transparente y mezclarse con agua para crear efectos fluidos y translúcidos.'
            },
            {
              id: 3,
              pregunta: '¿Cuáles son los colores primarios?',
              opciones: [
                'Verde, naranja, morado',
                'Rojo, azul, amarillo',
                'Negro, blanco, gris',
                'Rosa, celeste, beige'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los colores primarios son rojo, azul y amarillo, porque no pueden crearse mezclando otros colores.'
            },
            {
              id: 4,
              pregunta: '¿Qué es un retrato en pintura?',
              opciones: [
                'Paisaje natural',
                'Representación de personas',
                'Objetos inanimados',
                'Formas abstractas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Un retrato es la representación artística de una persona, generalmente enfocándose en el rostro y expresión.'
            },
            {
              id: 5,
              pregunta: '¿Qué técnica ayuda a crear sensación de profundidad?',
              opciones: [
                'Solo usar un color',
                'Perspectiva',
                'Dibujar muy pequeño',
                'Usar solo líneas rectas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La perspectiva es una técnica que crea la ilusión de profundidad y espacio tridimensional en una superficie plana.'
            }
          ]
        },
        {
          id: 5,
          tipo: 'lectura',
          titulo: 'Música y Sonido',
          descripcion: 'Descubre el mundo de la música y los sonidos',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 6,
          tipo: 'preguntas',
          titulo: 'Evaluación: Música y Sonido',
          descripcion: 'Responde sobre música y elementos sonoros',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué elemento musical se refiere al patrón temporal de los sonidos?',
              opciones: [
                'Melodía',
                'Ritmo',
                'Armonía',
                'Timbre'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El ritmo es el patrón temporal de los sonidos, es lo que nos hace seguir el compás de la música.'
            },
            {
              id: 2,
              pregunta: '¿A qué familia de instrumentos pertenece la guitarra?',
              opciones: [
                'Viento',
                'Cuerda',
                'Percusión',
                'Electrónicos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La guitarra pertenece a la familia de instrumentos de cuerda porque produce sonido mediante la vibración de cuerdas.'
            },
            {
              id: 3,
              pregunta: '¿Qué relación hay entre frecuencia y altura del sonido?',
              opciones: [
                'No hay relación',
                'Frecuencias altas = sonidos agudos',
                'Frecuencias altas = sonidos graves',
                'Solo importa el volumen'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las frecuencias altas producen sonidos agudos, mientras que las frecuencias bajas producen sonidos graves.'
            },
            {
              id: 4,
              pregunta: '¿Cuál es un beneficio de la música según el texto?',
              opciones: [
                'Hace ruido',
                'Desarrolla habilidades cognitivas',
                'Es cara',
                'Es complicada'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La música desarrolla habilidades cognitivas, mejora la memoria, concentración y estimula la creatividad.'
            },
            {
              id: 5,
              pregunta: '¿Qué ha permitido la tecnología en la música?',
              opciones: [
                'Que sea más cara',
                'Democratizar la creación musical',
                'Que solo profesionales hagan música',
                'Eliminar instrumentos tradicionales'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La tecnología ha democratizado la creación musical, permitiendo que más personas puedan crear y compartir música usando aplicaciones y software accesible.'
            }
          ]
        },
        {
          id: 7,
          tipo: 'lectura',
          titulo: 'Teatro y Actuación',
          descripcion: 'Explora el arte dramático y la actuación',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 8,
          tipo: 'preguntas',
          titulo: 'Evaluación: Teatro y Actuación',
          descripcion: 'Responde sobre teatro y actuación',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es el teatro?',
              opciones: [
                'Solo ver películas',
                'Arte escénico donde actores interpretan una historia frente a una audiencia en vivo',
                'Solo leer libros',
                'Solo escuchar música'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El teatro es un arte escénico donde actores interpretan una historia frente a una audiencia en vivo, combinando varios elementos artísticos.'
            },
            {
              id: 2,
              pregunta: '¿Cuál NO es un elemento típico del teatro?',
              opciones: [
                'Actuación',
                'Programación de computadoras',
                'Escenografía',
                'Vestuario'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La programación de computadoras no es un elemento típico del teatro tradicional, aunque puede usarse en producciones muy modernas.'
            },
            {
              id: 3,
              pregunta: '¿Qué tipo de teatro busca hacer reír al público?',
              opciones: [
                'Tragedia',
                'Comedia',
                'Drama',
                'Teatro experimental'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La comedia es el género teatral que busca hacer reír y entretener al público con situaciones divertidas.'
            },
            {
              id: 4,
              pregunta: '¿Cuál es una habilidad importante para los actores?',
              opciones: [
                'Saber matemáticas avanzadas',
                'Expresión vocal y corporal',
                'Saber programar',
                'Ser muy alto'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los actores necesitan desarrollar expresión vocal y corporal para comunicar efectivamente las emociones y acciones de sus personajes.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es un beneficio de participar en teatro?',
              opciones: [
                'Te hace más tímido',
                'Desarrolla confianza y autoestima',
                'Te aísla de otros',
                'Solo es útil para actores profesionales'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Participar en teatro desarrolla confianza, autoestima y habilidades de comunicación, además de fomentar la creatividad.'
            }
          ]
        },
        {
          id: 9,
          tipo: 'lectura',
          titulo: 'Arte Digital y Multimedia',
          descripcion: 'Descubre las nuevas formas de arte usando tecnología',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 10,
          tipo: 'preguntas',
          titulo: 'Evaluación: Arte Digital y Multimedia',
          descripcion: 'Responde sobre arte digital y multimedia',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es el arte digital?',
              opciones: [
                'Solo fotografías en computadora',
                'Cualquier obra artística creada usando tecnología digital',
                'Solo videojuegos',
                'Solo música electrónica'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El arte digital es cualquier obra artística creada usando tecnología digital, incluyendo ilustraciones, animaciones, arte 3D y más.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es una herramienta común para arte digital?',
              opciones: [
                'Martillo',
                'Tableta gráfica',
                'Pincel tradicional',
                'Cincel'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las tabletas gráficas permiten a los artistas dibujar directamente en la computadora de forma más natural y precisa.'
            },
            {
              id: 3,
              pregunta: '¿Qué combina el arte multimedia?',
              opciones: [
                'Solo audio',
                'Diferentes medios como video, audio y texto',
                'Solo imágenes',
                'Solo texto'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El arte multimedia combina diferentes medios como video, audio, texto, imágenes e interactividad para crear experiencias ricas.'
            },
            {
              id: 4,
              pregunta: '¿Cuál es una ventaja del arte digital?',
              opciones: [
                'Es más caro',
                'Fácil corrección y experimentación',
                'Requiere muchos materiales',
                'Es más lento de crear'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Una ventaja clave del arte digital es la facilidad para hacer correcciones y experimentar sin desperdiciar materiales físicos.'
            },
            {
              id: 5,
              pregunta: '¿Cuál es una tendencia emergente en arte digital?',
              opciones: [
                'Volver solo a materiales tradicionales',
                'Arte creado con inteligencia artificial',
                'Eliminar las computadoras',
                'Usar solo papel y lápiz'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El arte creado con inteligencia artificial es una tendencia emergente que está redefiniendo las posibilidades creativas.'
            }
          ]
        }
      ]
    },
    {
      id: 'matematicas',
      titulo: 'Matemáticas',
      descripcion: 'Juega y aprende con números, lógica y desafíos matemáticos',
      actividades: [
        {
          id: 1,
          tipo: 'lectura',
          titulo: 'El Fascinante Mundo de las Matemáticas',
          descripcion: 'Descubre por qué las matemáticas son el lenguaje del universo',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 2,
          tipo: 'preguntas',
          titulo: 'Evaluación: El Mundo de las Matemáticas',
          descripcion: 'Responde sobre la importancia de las matemáticas',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Por qué las matemáticas se consideran un lenguaje universal?',
              opciones: [
                'Porque solo los científicos las entienden',
                'Porque nos permiten entender y describir patrones en todo el mundo',
                'Porque son muy difíciles',
                'Porque solo se usan en las escuelas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las matemáticas son universales porque nos permiten entender, describir y predecir patrones que se encuentran en toda la naturaleza.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es un ejemplo de matemáticas en la naturaleza?',
              opciones: [
                'Los colores del arcoíris',
                'La secuencia de Fibonacci en los girasoles',
                'El sabor de las frutas',
                'El sonido de los pájaros'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La secuencia de Fibonacci aparece en muchos lugares de la naturaleza, incluyendo los patrones de semillas en los girasoles.'
            },
            {
              id: 3,
              pregunta: '¿Cómo usamos matemáticas en la vida diaria?',
              opciones: [
                'Solo en los exámenes escolares',
                'Al calcular tiempo, manejar dinero y cocinar',
                'Únicamente los ingenieros las usan',
                'Solo para resolver problemas muy complejos'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Usamos matemáticas constantemente en actividades cotidianas como calcular tiempo, manejar dinero, cocinar y muchas otras tareas.'
            },
            {
              id: 4,
              pregunta: '¿Qué estudia la geometría?',
              opciones: [
                'Solo números',
                'Formas, espacios y sus propiedades',
                'Solo estadísticas',
                'Solo ecuaciones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La geometría es la rama de las matemáticas que estudia formas, espacios y sus propiedades, como líneas, ángulos y figuras.'
            },
            {
              id: 5,
              pregunta: '¿Qué desarrollan las matemáticas además de resolver problemas?',
              opciones: [
                'Solo memoria',
                'Pensamiento lógico y capacidad de análisis',
                'Solo velocidad de cálculo',
                'Solo conocimiento de números'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Las matemáticas desarrollan el pensamiento lógico, la capacidad de análisis y el razonamiento sistemático.'
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Números y Operaciones Básicas',
          descripcion: 'Comprende los fundamentos de los números y cálculos',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 4,
          tipo: 'preguntas',
          titulo: 'Evaluación: Números y Operaciones',
          descripcion: 'Responde sobre números y operaciones básicas',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Cómo se llama nuestro sistema de números?',
              opciones: [
                'Sistema binario',
                'Sistema decimal',
                'Sistema romano',
                'Sistema alfabético'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Nuestro sistema se llama decimal porque se basa en grupos de diez y usa los dígitos del 0 al 9.'
            },
            {
              id: 2,
              pregunta: '¿Cuáles son números pares?',
              opciones: [
                '1, 3, 5, 7',
                '2, 4, 6, 8',
                'Solo el cero',
                'Todos los números'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los números pares son aquellos que se pueden dividir exactamente por 2, como 2, 4, 6, 8, etc.'
            },
            {
              id: 3,
              pregunta: '¿Qué operación representa "juntar cantidades"?',
              opciones: [
                'División',
                'Suma',
                'Multiplicación',
                'Resta'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La suma (+) representa la operación de juntar o agregar cantidades.'
            },
            {
              id: 4,
              pregunta: '¿Qué vale 1/2 en decimal?',
              opciones: [
                '0.25',
                '0.5',
                '0.75',
                '1.0'
              ],
              respuestaCorrecta: 1,
              explicacion: '1/2 (un medio) equivale a 0.5 en decimal, representando la mitad de un entero.'
            },
            {
              id: 5,
              pregunta: 'En 2 + 3 × 4, ¿cuál operación se hace primero?',
              opciones: [
                'La suma',
                'La multiplicación',
                'No importa',
                'Se hace al mismo tiempo'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Según el orden de operaciones, la multiplicación se hace antes que la suma: 2 + 3 × 4 = 2 + 12 = 14.'
            }
          ]
        },
        {
          id: 5,
          tipo: 'lectura',
          titulo: 'Geometría y Formas',
          descripcion: 'Explora el mundo de las formas y el espacio',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 6,
          tipo: 'preguntas',
          titulo: 'Evaluación: Geometría y Formas',
          descripcion: 'Responde sobre geometría y formas',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué estudia la geometría?',
              opciones: [
                'Solo números',
                'Formas, tamaños, posiciones y propiedades del espacio',
                'Solo estadísticas',
                'Solo operaciones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La geometría estudia formas, tamaños, posiciones y propiedades del espacio, ayudándonos a entender el mundo visual.'
            },
            {
              id: 2,
              pregunta: '¿Cuántos lados tiene un hexágono?',
              opciones: [
                'Cuatro',
                'Seis',
                'Cinco',
                'Ocho'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Un hexágono tiene seis lados. El prefijo "hexa" significa seis.'
            },
            {
              id: 3,
              pregunta: '¿Qué forma 3D es como una pelota?',
              opciones: [
                'Cubo',
                'Esfera',
                'Cilindro',
                'Pirámide'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Una esfera es perfectamente redonda como una pelota, siendo la forma 3D equivalente al círculo en 2D.'
            },
            {
              id: 4,
              pregunta: '¿Cuántos grados tiene un ángulo recto?',
              opciones: [
                '45 grados',
                '90 grados',
                '180 grados',
                '360 grados'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Un ángulo recto tiene exactamente 90 grados, como la esquina de un cuadrado o rectángulo.'
            },
            {
              id: 5,
              pregunta: '¿Qué es el perímetro?',
              opciones: [
                'El espacio dentro de una forma',
                'La distancia alrededor de una forma',
                'Solo el área',
                'La altura de una forma'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El perímetro es la distancia total alrededor del borde exterior de una forma bidimensional.'
            }
          ]
        },
        {
          id: 7,
          tipo: 'lectura',
          titulo: 'Patrones y Secuencias',
          descripcion: 'Descubre los patrones matemáticos que nos rodean',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 8,
          tipo: 'preguntas',
          titulo: 'Evaluación: Patrones y Secuencias',
          descripcion: 'Responde sobre patrones y secuencias matemáticas',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué es un patrón?',
              opciones: [
                'Un número grande',
                'Algo que se repite de manera regular y predecible',
                'Solo formas geométricas',
                'Solo colores'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Un patrón es algo que se repite de manera regular y predecible, permitiéndonos hacer predicciones sobre lo que sigue.'
            },
            {
              id: 2,
              pregunta: 'En la secuencia de Fibonacci 1, 1, 2, 3, 5, 8..., ¿cuál es el siguiente número?',
              opciones: [
                '10',
                '13',
                '11',
                '16'
              ],
              respuestaCorrecta: 1,
              explicacion: 'En Fibonacci, cada número es la suma de los dos anteriores: 5 + 8 = 13.'
            },
            {
              id: 3,
              pregunta: 'En la secuencia 5, 10, 15, 20..., ¿cuál es la diferencia común?',
              opciones: [
                '+3',
                '+5',
                '+10',
                'x2'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Esta es una secuencia aritmética donde se suma 5 cada vez: 5+5=10, 10+5=15, 15+5=20.'
            },
            {
              id: 4,
              pregunta: '¿Dónde encontramos hexágonos en la naturaleza?',
              opciones: [
                'En las hojas',
                'En panales de abejas',
                'En las flores',
                'En las rocas'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Los panales de abejas están formados por celdas hexagonales, que es la forma más eficiente para almacenar miel.'
            },
            {
              id: 5,
              pregunta: '¿Qué tipo de secuencia es 2, 6, 18, 54...?',
              opciones: [
                'Aritmética',
                'Geométrica',
                'Fibonacci',
                'De números pares'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Es una secuencia geométrica porque cada término se multiplica por 3: 2×3=6, 6×3=18, 18×3=54.'
            }
          ]
        },
        {
          id: 9,
          tipo: 'lectura',
          titulo: 'Probabilidad y Estadística Básica',
          descripcion: 'Comprende el azar, los datos y las predicciones',
          videoUrl: 'https://www.youtube.com/embed/1hHMwLxN6EM'
        },
        {
          id: 10,
          tipo: 'preguntas',
          titulo: 'Evaluación: Probabilidad y Estadística',
          descripcion: 'Responde sobre probabilidad y estadística básica',
          preguntas: [
            {
              id: 1,
              pregunta: '¿Qué estudia la probabilidad?',
              opciones: [
                'Solo números grandes',
                'La posibilidad de que ocurran eventos',
                'Solo geometría',
                'Solo operaciones'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La probabilidad estudia la posibilidad de que ocurran eventos, ayudándonos a entender el azar y hacer predicciones.'
            },
            {
              id: 2,
              pregunta: '¿Cuál es la probabilidad de sacar cara al lanzar una moneda?',
              opciones: [
                '25%',
                '50%',
                '75%',
                '100%'
              ],
              respuestaCorrecta: 1,
              explicacion: 'En una moneda hay 2 resultados posibles (cara, cruz) y 1 caso favorable (cara), entonces P(cara) = 1/2 = 50%.'
            },
            {
              id: 3,
              pregunta: '¿Cómo se calcula la media (promedio)?',
              opciones: [
                'Se toma el número más grande',
                'Se suman todos los números y se divide por la cantidad',
                'Se toma el número del medio',
                'Se cuenta cuántas veces aparece cada número'
              ],
              respuestaCorrecta: 1,
              explicacion: 'La media se calcula sumando todos los números y dividiendo por la cantidad total de números.'
            },
            {
              id: 4,
              pregunta: '¿Qué tipo de gráfico es mejor para mostrar partes de un total?',
              opciones: [
                'Gráfico de barras',
                'Gráfico circular',
                'Histograma',
                'Tabla'
              ],
              respuestaCorrecta: 1,
              explicacion: 'El gráfico circular (o de pastel) es ideal para mostrar cómo las partes forman un total, como porcentajes.'
            },
            {
              id: 5,
              pregunta: '¿En qué situación de la vida real NO usamos probabilidad?',
              opciones: [
                'Predicción del clima',
                'Recordar la tabla de multiplicar',
                'Juegos y deportes',
                'Planificación de transporte'
              ],
              respuestaCorrecta: 1,
              explicacion: 'Recordar la tabla de multiplicar es memorización de hechos matemáticos exactos, no involucra probabilidad o incertidumbre.'
            }
          ]
        }
      ]
    }
  ];

  // Ciencia se muestra aparte en el HTML
  cursosColor = [
    {
      id: 'ciencias',
      titulo: 'Ciencias',
      descripcion: 'Descubre los secretos del universo, la naturaleza y la vida.',
      icono: 'bi bi-lightbulb',
      bgClass: 'bg-success bg-opacity-10',
      textClass: 'text-success',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'tecnologia',
      titulo: 'Tecnología',
      descripcion: 'Aprende sobre computadoras, internet, robótica y el futuro digital.',
      icono: 'bi bi-cpu',
      bgClass: 'bg-primary bg-opacity-10',
      textClass: 'text-primary',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'ingenieria',
      titulo: 'Ingeniería',
      descripcion: 'Construye, diseña y resuelve problemas con proyectos de ingeniería.',
      icono: 'bi bi-gear-wide-connected',
      bgClass: 'bg-purple bg-opacity-10',
      textClass: 'text-purple',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'artes',
      titulo: 'Artes',
      descripcion: 'Explora tu creatividad con música, pintura, teatro y más.',
      icono: 'bi bi-palette',
      bgClass: 'bg-warning bg-opacity-10',
      textClass: 'text-warning',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'matematicas',
      titulo: 'Matemáticas',
      descripcion: 'Juega y aprende con números, lógica y desafíos matemáticos.',
      icono: 'bi bi-calculator',
      bgClass: 'bg-danger bg-opacity-10',
      textClass: 'text-danger',
      btnClass: 'btn-outline-primary'
    }
  ];

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  irCurso(id: string) {
    this.loadingCurso = id;

    // Buscar el curso estático
    const curso = this.cursosEstaticos.find(c => c.id === id);

    if (curso) {
      // Si encontramos el curso estático, abrir modal con lista de actividades
      setTimeout(() => {
        this.cursoSeleccionado = curso;
        this.mostrarModal = true;
        // NO iniciar ninguna actividad, mostrar la lista
        this.actividadActiva = null;
        this.loadingCurso = null;
      }, 900);
    } else {
      // Si no hay datos estáticos, navegar a curso-detalle (que mostrará 404)
      setTimeout(() => {
        this.router.navigate(['/cursos', id]);
        this.loadingCurso = null;
      }, 900);
    }
  }

  // Métodos para manejar el modal
  cerrarModal() {
    if (this.actividadActiva) {
      // Si hay una actividad activa, solo volver a la lista
      this.mostrarListaActividades();
    } else {
      // Si no hay actividad, cerrar todo el modal
      this.mostrarModal = false;
      this.cursoSeleccionado = null;
      this.actividadActiva = null;
      this.respuestas = [];
      this.mostrarResultados = false;
      this.aciertos = 0;
    }
  }

  cerrarTodoModal() {
    this.mostrarModal = false;
    this.cursoSeleccionado = null;
    this.actividadActiva = null;
    this.respuestas = [];
    this.mostrarResultados = false;
    this.aciertos = 0;
  }

  iniciarActividad(actividad: any) {
    this.actividadActiva = actividad;
    if (actividad.tipo === 'preguntas' && actividad.preguntas) {
      this.respuestas = Array(actividad.preguntas.length).fill(-1);
      this.mostrarResultados = false;
    }
  }

  volverAListaActividades() {
    this.actividadActiva = null;
    this.respuestas = [];
    this.mostrarResultados = false;
    this.aciertos = 0;
  }

  mostrarListaActividades() {
    this.actividadActiva = null;
    this.respuestas = [];
    this.mostrarResultados = false;
    this.aciertos = 0;
  }

  seleccionarRespuesta(preguntaIdx: number, opcionIdx: number) {
    this.respuestas[preguntaIdx] = opcionIdx;
  }

  finalizarEvaluacion() {
    if (!this.actividadActiva?.preguntas) return;

    let aciertos = 0;
    this.actividadActiva.preguntas.forEach((pregunta: any, idx: number) => {
      if (this.respuestas[idx] === pregunta.respuestaCorrecta) {
        aciertos++;
      }
    });

    this.aciertos = aciertos;
    this.mostrarResultados = true;
  }

  getRespuestasCompletadas(): number {
    return this.respuestas.filter(r => r !== -1).length;
  }

  getPorcentajeAciertos(): number {
    if (!this.actividadActiva?.preguntas) return 0;
    return (this.aciertos / this.actividadActiva.preguntas.length) * 100;
  }

  esAprobado(): boolean {
    if (!this.actividadActiva?.preguntas) return false;
    return this.aciertos >= this.actividadActiva.preguntas.length * 0.7;
  }

  reiniciarEvaluacion() {
    this.respuestas = Array(this.actividadActiva.preguntas.length).fill(-1);
    this.mostrarResultados = false;
    this.aciertos = 0;
  }
}


