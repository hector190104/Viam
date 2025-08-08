import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule]
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

  constructor(private router: Router) {}

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
            }
          ]
        },
        {
          id: 3,
          tipo: 'lectura',
          titulo: 'Inteligencia Artificial y Machine Learning',
          descripcion: 'Descubre cómo la IA está transformando nuestro mundo',
          contenido: `
            <h2>¿Qué es la Inteligencia Artificial?</h2>
            <p>La Inteligencia Artificial (IA) es una rama de la tecnología que busca crear máquinas y sistemas capaces de realizar tareas que normalmente requieren inteligencia humana, como reconocer imágenes, entender el lenguaje o tomar decisiones.</p>
            
            <h3>Tipos de Inteligencia Artificial</h3>
            <p>Existen diferentes niveles de IA:</p>
            <ul>
              <li><strong>IA Débil:</strong> Sistemas especializados en una tarea específica (como Siri o Alexa)</li>
              <li><strong>IA General:</strong> Sistemas que pueden realizar cualquier tarea intelectual humana</li>
              <li><strong>IA Superinteligente:</strong> Sistemas que superan la inteligencia humana en todos los aspectos</li>
            </ul>
            
            <h3>Machine Learning</h3>
            <p>El aprendizaje automático es una parte fundamental de la IA:</p>
            <ul>
              <li>Las máquinas aprenden de los datos sin ser programadas explícitamente</li>
              <li>Mejoran su rendimiento con la experiencia</li>
              <li>Pueden encontrar patrones en grandes cantidades de información</li>
              <li>Se dividen en aprendizaje supervisado, no supervisado y por refuerzo</li>
            </ul>
            
            <h3>Aplicaciones Actuales de la IA</h3>
            <p>La IA ya está presente en muchas áreas de nuestra vida:</p>
            <ul>
              <li><strong>Asistentes Virtuales:</strong> Siri, Google Assistant, Alexa</li>
              <li><strong>Redes Sociales:</strong> Algoritmos que deciden qué contenido ver</li>
              <li><strong>Medicina:</strong> Diagnóstico por imágenes y descubrimiento de medicamentos</li>
              <li><strong>Transporte:</strong> Autos autónomos y navegación GPS</li>
              <li><strong>Entretenimiento:</strong> Recomendaciones en Netflix, Spotify</li>
            </ul>
            
            <p>La IA continúa evolucionando y transformando la manera en que interactuamos con la tecnología.</p>
          `
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
          contenido: `
            <h2>¿Qué es Internet?</h2>
            <p>Internet es una red global de computadoras interconectadas que permite el intercambio de información, comunicación y acceso a recursos digitales desde cualquier parte del mundo.</p>
            
            <h3>Historia de Internet</h3>
            <p>Internet ha evolucionado desde proyectos militares hasta la red global actual:</p>
            <ul>
              <li><strong>1960s:</strong> ARPANET, la primera red de computadoras</li>
              <li><strong>1980s:</strong> Desarrollo del protocolo TCP/IP</li>
              <li><strong>1990s:</strong> Invención del World Wide Web (WWW)</li>
              <li><strong>2000s:</strong> Redes sociales y Web 2.0</li>
              <li><strong>Actualidad:</strong> Internet móvil y dispositivos conectados</li>
            </ul>
            
            <h3>Cómo Funciona Internet</h3>
            <p>Internet funciona a través de varios componentes clave:</p>
            <ul>
              <li><strong>Servidores:</strong> Computadoras que almacenan sitios web y datos</li>
              <li><strong>Routers:</strong> Dirigen el tráfico de datos por las rutas correctas</li>
              <li><strong>ISP:</strong> Proveedores de servicios de internet</li>
              <li><strong>Protocolos:</strong> Reglas que gobiernan la comunicación (HTTP, TCP/IP)</li>
              <li><strong>DNS:</strong> Sistema que traduce nombres web a direcciones IP</li>
            </ul>
            
            <h3>Servicios de Internet</h3>
            <p>Internet ofrece diversos servicios:</p>
            <ul>
              <li>Navegación web (sitios web, blogs)</li>
              <li>Correo electrónico</li>
              <li>Redes sociales (Facebook, Twitter, Instagram)</li>
              <li>Streaming de video y música</li>
              <li>Comercio electrónico</li>
              <li>Videollamadas y comunicación en tiempo real</li>
            </ul>
            
            <h3>Seguridad en Internet</h3>
            <p>Es importante navegar de forma segura:</p>
            <ul>
              <li>Usar contraseñas seguras y únicas</li>
              <li>No compartir información personal con desconocidos</li>
              <li>Verificar la autenticidad de sitios web</li>
              <li>Mantener software actualizado</li>
              <li>Ser consciente de estafas en línea</li>
            </ul>
            
            <p>Internet ha revolucionado la forma en que accedemos a la información, nos comunicamos y realizamos actividades diarias.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Programación?</h2>
            <p>La programación es el proceso de crear instrucciones detalladas que las computadoras pueden seguir para realizar tareas específicas. Es como escribir recetas que las máquinas pueden entender y ejecutar.</p>
            
            <h3>Lenguajes de Programación</h3>
            <p>Existen diferentes lenguajes para comunicarse con las computadoras:</p>
            <ul>
              <li><strong>Python:</strong> Fácil de aprender, usado en ciencia de datos e IA</li>
              <li><strong>JavaScript:</strong> El lenguaje de la web, usado en sitios web interactivos</li>
              <li><strong>Java:</strong> Popular en aplicaciones empresariales</li>
              <li><strong>C++:</strong> Usado en videojuegos y sistemas de alto rendimiento</li>
              <li><strong>Scratch:</strong> Visual, perfecto para principiantes</li>
            </ul>
            
            <h3>Conceptos Básicos de Programación</h3>
            <p>Los programadores trabajan con conceptos fundamentales:</p>
            <ul>
              <li><strong>Variables:</strong> Espacios para guardar información</li>
              <li><strong>Funciones:</strong> Bloques de código reutilizables</li>
              <li><strong>Condiciones:</strong> Decisiones que toma el programa (si... entonces...)</li>
              <li><strong>Bucles:</strong> Repetir acciones múltiples veces</li>
              <li><strong>Algoritmos:</strong> Pasos ordenados para resolver problemas</li>
            </ul>
            
            <h3>Tipos de Software</h3>
            <p>Los programadores crean diferentes tipos de software:</p>
            <ul>
              <li><strong>Aplicaciones móviles:</strong> Apps para teléfonos y tablets</li>
              <li><strong>Sitios web:</strong> Páginas y servicios en internet</li>
              <li><strong>Videojuegos:</strong> Entretenimiento interactivo</li>
              <li><strong>Sistemas operativos:</strong> Windows, macOS, Linux</li>
              <li><strong>Software empresarial:</strong> Programas para empresas</li>
            </ul>
            
            <h3>El Proceso de Desarrollo</h3>
            <p>Crear software sigue un proceso estructurado:</p>
            <ul>
              <li>Planificar qué problema resolver</li>
              <li>Diseñar la solución</li>
              <li>Escribir el código</li>
              <li>Probar que funcione correctamente</li>
              <li>Lanzar y mantener el software</li>
            </ul>
            
            <p>La programación combina lógica, creatividad y resolución de problemas para crear herramientas digitales útiles.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Robótica?</h2>
            <p>La robótica es la rama de la tecnología que se ocupa del diseño, construcción, operación y uso de robots. Los robots son máquinas programables capaces de realizar tareas de forma autónoma o semiautónoma.</p>
            
            <h3>Componentes de un Robot</h3>
            <p>Los robots están formados por varios elementos esenciales:</p>
            <ul>
              <li><strong>Sensores:</strong> Recogen información del entorno (cámaras, micrófonos)</li>
              <li><strong>Actuadores:</strong> Permiten el movimiento (motores, servos)</li>
              <li><strong>Controlador:</strong> El "cerebro" que procesa información y toma decisiones</li>
              <li><strong>Estructura mecánica:</strong> El cuerpo físico del robot</li>
              <li><strong>Software:</strong> Los programas que controlan el comportamiento</li>
            </ul>
            
            <h3>Tipos de Robots</h3>
            <p>Existen diferentes categorías de robots según su función:</p>
            <ul>
              <li><strong>Robots industriales:</strong> Para fabricación y ensamblaje</li>
              <li><strong>Robots de servicio:</strong> Aspiradoras automáticas, robots de limpieza</li>
              <li><strong>Robots médicos:</strong> Asistencia en cirugías</li>
              <li><strong>Robots exploradores:</strong> Para explorar espacio o lugares peligrosos</li>
              <li><strong>Robots humanoides:</strong> Con forma parecida a los humanos</li>
              <li><strong>Drones:</strong> Robots voladores</li>
            </ul>
            
            <h3>Automatización</h3>
            <p>La automatización usa robots y sistemas para realizar tareas sin intervención humana:</p>
            <ul>
              <li>Líneas de producción en fábricas</li>
              <li>Sistemas de riego automático</li>
              <li>Ascensores inteligentes</li>
              <li>Cajeros automáticos</li>
              <li>Sistemas de seguridad automáticos</li>
            </ul>
            
            <h3>Aplicaciones en la Vida Cotidiana</h3>
            <p>Los robots ya forman parte de nuestro día a día:</p>
            <ul>
              <li>Aspiradoras robóticas que limpian la casa</li>
              <li>Asistentes virtuales como Alexa</li>
              <li>Robots en restaurantes que sirven comida</li>
              <li>Coches con funciones de conducción automática</li>
              <li>Chatbots que responden preguntas en sitios web</li>
            </ul>
            
            <h3>El Futuro de la Robótica</h3>
            <p>La robótica continuará avanzando:</p>
            <ul>
              <li>Robots más inteligentes con IA avanzada</li>
              <li>Colaboración más estrecha entre humanos y robots</li>
              <li>Robots para cuidado de personas mayores</li>
              <li>Exploración espacial con robots autónomos</li>
            </ul>
            
            <p>La robótica representa un campo emocionante que combina ingeniería, programación e inteligencia artificial para crear máquinas que pueden ayudar y colaborar con los humanos.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Ciencia?</h2>
            <p>La ciencia es una forma sistemática de estudiar el mundo natural a través de la observación, experimentación y análisis. Los científicos buscan entender cómo funciona todo lo que nos rodea.</p>
            
            <h3>El Método Científico</h3>
            <p>Los científicos siguen un proceso llamado método científico para hacer sus investigaciones:</p>
            <ul>
              <li><strong>1. Observación:</strong> Notar algo interesante en la naturaleza</li>
              <li><strong>2. Pregunta:</strong> Formular una pregunta sobre lo observado</li>
              <li><strong>3. Hipótesis:</strong> Proponer una posible respuesta</li>
              <li><strong>4. Experimento:</strong> Probar la hipótesis</li>
              <li><strong>5. Conclusión:</strong> Analizar los resultados</li>
            </ul>
            
            <h3>Ramas de la Ciencia</h3>
            <p>La ciencia se divide en diferentes ramas:</p>
            <ul>
              <li><strong>Biología:</strong> Estudio de los seres vivos</li>
              <li><strong>Química:</strong> Estudio de la materia y sus cambios</li>
              <li><strong>Física:</strong> Estudio del movimiento, energía y fuerzas</li>
              <li><strong>Astronomía:</strong> Estudio del espacio y los planetas</li>
              <li><strong>Geología:</strong> Estudio de la Tierra</li>
            </ul>
            
            <p>La ciencia nos ayuda a entender nuestro mundo y a crear tecnologías que mejoran nuestras vidas.</p>
          `
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
          contenido: `
            <h2>¿Qué son los Seres Vivos?</h2>
            <p>Los seres vivos son todos los organismos que tienen vida, desde las bacterias más pequeñas hasta los árboles más grandes y los animales más complejos. Todos comparten características básicas que los distinguen de los objetos no vivos.</p>
            
            <h3>Características de los Seres Vivos</h3>
            <p>Todos los seres vivos comparten estas características fundamentales:</p>
            <ul>
              <li><strong>Crecimiento:</strong> Aumentan de tamaño durante su vida</li>
              <li><strong>Reproducción:</strong> Pueden crear nuevos individuos de su especie</li>
              <li><strong>Metabolismo:</strong> Transforman alimentos en energía</li>
              <li><strong>Respuesta al ambiente:</strong> Reaccionan a cambios en su entorno</li>
              <li><strong>Organización:</strong> Están formados por células</li>
              <li><strong>Homeostasis:</strong> Mantienen su equilibrio interno</li>
            </ul>
            
            <h3>Clasificación de los Seres Vivos</h3>
            <p>Los científicos clasifican la vida en grandes grupos:</p>
            <ul>
              <li><strong>Plantas:</strong> Fabrican su propio alimento usando el sol</li>
              <li><strong>Animales:</strong> Se alimentan de otros seres vivos</li>
              <li><strong>Hongos:</strong> Descomponen materia orgánica</li>
              <li><strong>Bacterias:</strong> Organismos microscópicos simples</li>
              <li><strong>Protistas:</strong> Organismos microscópicos más complejos</li>
            </ul>
            
            <h3>Biodiversidad</h3>
            <p>La biodiversidad es la variedad de vida en la Tierra:</p>
            <ul>
              <li>Existen millones de especies diferentes</li>
              <li>Cada una está adaptada a su ambiente</li>
              <li>Forman ecosistemas interconectados</li>
              <li>Muchas especies aún no han sido descubiertas</li>
            </ul>
            
            <h3>Ecosistemas</h3>
            <p>Los seres vivos no viven aislados, forman ecosistemas:</p>
            <ul>
              <li>Bosques tropicales con gran diversidad</li>
              <li>Océanos llenos de vida marina</li>
              <li>Desiertos con especies adaptadas al calor</li>
              <li>Tundra ártica con vida resistente al frío</li>
            </ul>
            
            <p>La diversidad de la vida es uno de los tesoros más grandes de nuestro planeta y es importante protegerla para las futuras generaciones.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Materia?</h2>
            <p>La materia es todo lo que ocupa espacio y tiene masa. Todo lo que puedes tocar, ver o sentir está hecho de materia: el aire que respiras, el agua que bebes, la silla donde te sientas.</p>
            
            <h3>Los Estados de la Materia</h3>
            <p>La materia puede encontrarse en diferentes estados:</p>
            <ul>
              <li><strong>Sólido:</strong> Tiene forma y volumen definidos (hielo, madera, rocas)</li>
              <li><strong>Líquido:</strong> Tiene volumen definido pero toma la forma del recipiente (agua, aceite)</li>
              <li><strong>Gaseoso:</strong> No tiene forma ni volumen definidos (aire, vapor de agua)</li>
              <li><strong>Plasma:</strong> Estado muy caliente donde los electrones se separan (el Sol)</li>
            </ul>
            
            <h3>Cambios de Estado</h3>
            <p>La materia puede cambiar de un estado a otro:</p>
            <ul>
              <li><strong>Fusión:</strong> De sólido a líquido (hielo derritiéndose)</li>
              <li><strong>Vaporización:</strong> De líquido a gas (agua hirviendo)</li>
              <li><strong>Condensación:</strong> De gas a líquido (vapor en las ventanas)</li>
              <li><strong>Solidificación:</strong> De líquido a sólido (agua congelándose)</li>
              <li><strong>Sublimación:</strong> De sólido directamente a gas (hielo seco)</li>
            </ul>
            
            <h3>Propiedades de la Materia</h3>
            <p>La materia tiene diferentes propiedades:</p>
            <ul>
              <li><strong>Masa:</strong> Cantidad de materia que contiene</li>
              <li><strong>Volumen:</strong> Espacio que ocupa</li>
              <li><strong>Densidad:</strong> Relación entre masa y volumen</li>
              <li><strong>Temperatura:</strong> Qué tan caliente o frío está</li>
              <li><strong>Color, olor, textura:</strong> Características observables</li>
            </ul>
            
            <h3>Partículas y Átomos</h3>
            <p>Toda la materia está formada por partículas muy pequeñas:</p>
            <ul>
              <li>Los átomos son los bloques básicos de construcción</li>
              <li>En los sólidos, las partículas están muy juntas y organizadas</li>
              <li>En los líquidos, están juntas pero pueden moverse</li>
              <li>En los gases, están separadas y se mueven libremente</li>
            </ul>
            
            <p>Entender la materia nos ayuda a comprender cómo funciona todo en nuestro mundo, desde las nubes en el cielo hasta los objetos que usamos diariamente.</p>
          `
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
          contenido: `
            <h2>¿Qué es una Fuerza?</h2>
            <p>Una fuerza es una acción que puede cambiar el estado de movimiento de un objeto. Puede hacer que algo se mueva, se detenga, cambie de dirección o cambie de forma. Las fuerzas están en todas partes en nuestro mundo.</p>
            
            <h3>Tipos de Fuerzas</h3>
            <p>Existen diferentes tipos de fuerzas en la naturaleza:</p>
            <ul>
              <li><strong>Gravedad:</strong> Fuerza que nos mantiene en la Tierra</li>
              <li><strong>Fricción:</strong> Fuerza que se opone al movimiento</li>
              <li><strong>Magnética:</strong> Fuerza de los imanes</li>
              <li><strong>Eléctrica:</strong> Fuerza entre cargas eléctricas</li>
              <li><strong>Muscular:</strong> Fuerza que hacemos con nuestros músculos</li>
            </ul>
            
            <h3>El Movimiento</h3>
            <p>El movimiento ocurre cuando un objeto cambia de posición:</p>
            <ul>
              <li><strong>Reposo:</strong> Cuando un objeto no se mueve</li>
              <li><strong>Movimiento rectilíneo:</strong> En línea recta</li>
              <li><strong>Movimiento circular:</strong> En forma de círculo</li>
              <li><strong>Velocidad:</strong> Qué tan rápido se mueve algo</li>
              <li><strong>Aceleración:</strong> Cambio en la velocidad</li>
            </ul>
            
            <h3>Las Leyes de Newton</h3>
            <p>Sir Isaac Newton describió tres leyes fundamentales:</p>
            <ul>
              <li><strong>Primera Ley (Inercia):</strong> Los objetos en reposo tienden a quedarse en reposo, los en movimiento a seguir moviéndose</li>
              <li><strong>Segunda Ley:</strong> Más fuerza = más aceleración</li>
              <li><strong>Tercera Ley:</strong> Para toda acción hay una reacción igual y opuesta</li>
            </ul>
            
            <h3>La Gravedad</h3>
            <p>La gravedad es una fuerza especial:</p>
            <ul>
              <li>Atrae todos los objetos hacia abajo</li>
              <li>Es lo que nos mantiene pegados a la Tierra</li>
              <li>Hace que las cosas caigan cuando las soltamos</li>
              <li>Es más fuerte en objetos más pesados</li>
              <li>En el espacio, los astronautas flotan porque hay menos gravedad</li>
            </ul>
            
            <h3>Ejemplos de Fuerzas en la Vida Diaria</h3>
            <p>Vemos fuerzas y movimiento constantemente:</p>
            <ul>
              <li>Empujar un carrito de compras</li>
              <li>Caminar (friction entre zapatos y suelo)</li>
              <li>Un imán pegando papeles a la nevera</li>
              <li>Una pelota rebotando</li>
              <li>El viento moviendo las hojas</li>
            </ul>
            
            <p>Entender las fuerzas y el movimiento nos ayuda a explicar casi todo lo que vemos en nuestro mundo físico.</p>
          `
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
          contenido: `
            <h2>¿Qué es el Sistema Solar?</h2>
            <p>El Sistema Solar es nuestro hogar cósmico. Está formado por el Sol, ocho planetas, sus lunas, asteroides, cometas y todo lo que orbita alrededor de nuestra estrella principal.</p>
            
            <h3>El Sol</h3>
            <p>El Sol es el centro de nuestro Sistema Solar:</p>
            <ul>
              <li>Es una estrella gigante de gas muy caliente</li>
              <li>Nos da luz y calor</li>
              <li>Es tan grande que podría contener más de un millón de Tierras</li>
              <li>Está hecho principalmente de hidrógeno y helio</li>
              <li>Su temperatura en el centro es de 15 millones de grados</li>
            </ul>
            
            <h3>Los Planetas</h3>
            <p>Nuestro Sistema Solar tiene ocho planetas:</p>
            <ul>
              <li><strong>Mercurio:</strong> El más cercano al Sol, muy caliente</li>
              <li><strong>Venus:</strong> El más caliente debido a su atmósfera densa</li>
              <li><strong>Tierra:</strong> Nuestro hogar, el único con vida conocida</li>
              <li><strong>Marte:</strong> El planeta rojo, con casquetes polares</li>
              <li><strong>Júpiter:</strong> El más grande, un gigante de gas</li>
              <li><strong>Saturno:</strong> Famoso por sus hermosos anillos</li>
              <li><strong>Urano:</strong> Gira de lado, color azul verdoso</li>
              <li><strong>Neptuno:</strong> El más lejano, azul y ventoso</li>
            </ul>
            
            <h3>La Luna</h3>
            <p>La Luna es el satélite natural de la Tierra:</p>
            <ul>
              <li>Orbita alrededor de la Tierra cada 28 días</li>
              <li>Es responsable de las mareas en los océanos</li>
              <li>Nos muestra diferentes fases (nueva, creciente, llena, menguante)</li>
              <li>Los humanos han caminado sobre ella</li>
              <li>No tiene atmósfera ni agua líquida</li>
            </ul>
            
            <h3>Más Allá del Sistema Solar</h3>
            <p>El universo es mucho más grande que nuestro Sistema Solar:</p>
            <ul>
              <li><strong>Estrellas:</strong> Soles lejanos, algunos con sus propios planetas</li>
              <li><strong>Galaxias:</strong> Agrupaciones de millones de estrellas</li>
              <li><strong>Vía Láctea:</strong> Nuestra galaxia, con 100 mil millones de estrellas</li>
              <li><strong>Universo:</strong> Todo lo que existe, infinitamente grande</li>
            </ul>
            
            <h3>Exploración Espacial</h3>
            <p>Los humanos han comenzado a explorar el espacio:</p>
            <ul>
              <li>Telescopios que nos muestran galaxias lejanas</li>
              <li>Sondas espaciales que visitan otros planetas</li>
              <li>Astronautas que viven en estaciones espaciales</li>
              <li>Búsqueda de vida en otros mundos</li>
            </ul>
            
            <p>El estudio del espacio nos ayuda a entender nuestro lugar en el universo y puede darnos pistas sobre el origen de la vida.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Ingeniería?</h2>
            <p>La ingeniería es el arte y la ciencia de aplicar conocimientos matemáticos, científicos y prácticos para diseñar, construir y mantener estructuras, máquinas, sistemas y procesos que mejoren la vida humana.</p>
            
            <h3>El Proceso de Diseño en Ingeniería</h3>
            <p>Los ingenieros siguen un proceso sistemático para resolver problemas:</p>
            <ul>
              <li><strong>1. Identificar el problema:</strong> Definir qué necesidad se debe satisfacer</li>
              <li><strong>2. Investigar:</strong> Estudiar soluciones existentes y restricciones</li>
              <li><strong>3. Brainstorming:</strong> Generar múltiples ideas y soluciones</li>
              <li><strong>4. Diseñar:</strong> Crear planos y especificaciones detalladas</li>
              <li><strong>5. Prototipar:</strong> Construir una versión de prueba</li>
              <li><strong>6. Probar:</strong> Evaluar el funcionamiento del prototipo</li>
              <li><strong>7. Mejorar:</strong> Refinar y optimizar el diseño</li>
            </ul>
            
            <h3>Ramas de la Ingeniería</h3>
            <p>Existen muchas especialidades en ingeniería:</p>
            <ul>
              <li><strong>Ingeniería Civil:</strong> Carreteras, puentes, edificios</li>
              <li><strong>Ingeniería Mecánica:</strong> Máquinas, motores, robots</li>
              <li><strong>Ingeniería Eléctrica:</strong> Sistemas eléctricos y electrónicos</li>
              <li><strong>Ingeniería Química:</strong> Procesos químicos industriales</li>
              <li><strong>Ingeniería de Software:</strong> Programas y aplicaciones</li>
              <li><strong>Ingeniería Biomédica:</strong> Tecnología para medicina</li>
            </ul>
            
            <h3>Herramientas del Ingeniero</h3>
            <p>Los ingenieros utilizan diversas herramientas:</p>
            <ul>
              <li>Matemáticas y cálculos para predecir comportamientos</li>
              <li>Software de diseño CAD para crear modelos 3D</li>
              <li>Simulaciones por computadora para probar ideas</li>
              <li>Materiales y herramientas para construir prototipos</li>
              <li>Instrumentos de medición para evaluar resultados</li>
            </ul>
            
            <p>La ingeniería combina creatividad con conocimiento técnico para crear soluciones innovadoras a los desafíos de nuestra sociedad.</p>
          `
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
          contenido: `
            <h2>¿Qué son las Estructuras?</h2>
            <p>Las estructuras son construcciones diseñadas para soportar cargas y resistir fuerzas. Desde las casas donde vivimos hasta los puentes que cruzamos, las estructuras están en todas partes y nos permiten vivir de forma segura y cómoda.</p>
            
            <h3>Tipos de Estructuras</h3>
            <p>Existen diferentes tipos de estructuras según su propósito:</p>
            <ul>
              <li><strong>Residenciales:</strong> Casas, apartamentos, condominios</li>
              <li><strong>Comerciales:</strong> Centros comerciales, oficinas, tiendas</li>
              <li><strong>Industriales:</strong> Fábricas, plantas de producción</li>
              <li><strong>Infraestructura:</strong> Puentes, túneles, carreteras</li>
              <li><strong>Recreativas:</strong> Estadios, parques, teatros</li>
            </ul>
            
            <h3>Elementos Estructurales</h3>
            <p>Las estructuras están compuestas por diferentes elementos:</p>
            <ul>
              <li><strong>Cimientos:</strong> Base que transmite el peso al suelo</li>
              <li><strong>Columnas:</strong> Elementos verticales que soportan peso</li>
              <li><strong>Vigas:</strong> Elementos horizontales que distribuyen cargas</li>
              <li><strong>Losas:</strong> Superficies planas como pisos y techos</li>
              <li><strong>Muros:</strong> Paredes que dividen espacios y soportan cargas</li>
            </ul>
            
            <h3>Materiales de Construcción</h3>
            <p>Los ingenieros eligen materiales según las necesidades:</p>
            <ul>
              <li><strong>Concreto:</strong> Fuerte en compresión, usado en cimientos</li>
              <li><strong>Acero:</strong> Fuerte en tensión, usado en vigas y columnas</li>
              <li><strong>Madera:</strong> Liviana y renovable, usada en casas</li>
              <li><strong>Ladrillo:</strong> Duradero, usado en muros</li>
              <li><strong>Vidrio:</strong> Transparente, usado en ventanas</li>
            </ul>
            
            <h3>Fuerzas que Actúan sobre las Estructuras</h3>
            <p>Las estructuras deben resistir diferentes tipos de fuerzas:</p>
            <ul>
              <li>Peso propio de la estructura</li>
              <li>Peso de las personas y objetos (carga viva)</li>
              <li>Viento que empuja las paredes</li>
              <li>Terremotos que mueven el suelo</li>
              <li>Nieve que se acumula en los techos</li>
            </ul>
            
            <h3>Seguridad Estructural</h3>
            <p>La seguridad es lo más importante en construcción:</p>
            <ul>
              <li>Cálculos precisos de resistencia</li>
              <li>Uso de códigos y normas de construcción</li>
              <li>Inspecciones durante la construcción</li>
              <li>Mantenimiento regular de las estructuras</li>
            </ul>
            
            <p>Los ingenieros civiles trabajan para crear estructuras seguras, eficientes y duraderas que sirvan a la comunidad durante muchos años.</p>
          `
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
          contenido: `
            <h2>¿Qué son las Máquinas?</h2>
            <p>Las máquinas son dispositivos que nos ayudan a realizar trabajo de manera más fácil, rápida o eficiente. Pueden amplificar nuestras fuerzas, cambiar la dirección del movimiento o transformar un tipo de energía en otro.</p>
            
            <h3>Máquinas Simples</h3>
            <p>Existen seis máquinas simples fundamentales:</p>
            <ul>
              <li><strong>Palanca:</strong> Una barra que gira sobre un punto fijo (tijeras, sube-baja)</li>
              <li><strong>Rueda y Eje:</strong> Una rueda conectada a un eje central (bicicleta, auto)</li>
              <li><strong>Polea:</strong> Una rueda con ranura por donde pasa una cuerda (grúas, elevadores)</li>
              <li><strong>Plano Inclinado:</strong> Una superficie inclinada (rampas, escaleras)</li>
              <li><strong>Cuña:</strong> Dos planos inclinados unidos (cuchillo, hacha)</li>
              <li><strong>Tornillo:</strong> Un plano inclinado enrollado (tornillos, sacacorchos)</li>
            </ul>
            
            <h3>Ventaja Mecánica</h3>
            <p>Las máquinas nos dan ventaja mecánica de diferentes formas:</p>
            <ul>
              <li>Multiplicar la fuerza que aplicamos</li>
              <li>Cambiar la dirección de la fuerza</li>
              <li>Aumentar la velocidad del movimiento</li>
              <li>Aumentar la distancia que se mueve algo</li>
            </ul>
            
            <h3>Máquinas Complejas</h3>
            <p>Las máquinas complejas combinan varias máquinas simples:</p>
            <ul>
              <li><strong>Bicicleta:</strong> Ruedas, palancas (frenos), cadena</li>
              <li><strong>Automóvil:</strong> Motor, ruedas, transmisión, frenos</li>
              <li><strong>Grúa:</strong> Poleas, palancas, motores</li>
              <li><strong>Robot:</strong> Motores, sensores, computadoras</li>
            </ul>
            
            <h3>Tipos de Energía en las Máquinas</h3>
            <p>Las máquinas utilizan diferentes tipos de energía:</p>
            <ul>
              <li><strong>Mecánica:</strong> Energía de movimiento (bicicleta)</li>
              <li><strong>Eléctrica:</strong> Energía de la electricidad (motores)</li>
              <li><strong>Química:</strong> Energía de combustibles (automóviles)</li>
              <li><strong>Solar:</strong> Energía del sol (calculadoras solares)</li>
              <li><strong>Hidráulica:</strong> Energía del agua o fluidos (excavadoras)</li>
            </ul>
            
            <h3>Mecanismos</h3>
            <p>Los mecanismos son partes de las máquinas que transmiten movimiento:</p>
            <ul>
              <li><strong>Engranajes:</strong> Ruedas dentadas que transmiten rotación</li>
              <li><strong>Cadenas:</strong> Transmiten movimiento entre ruedas distantes</li>
              <li><strong>Correas:</strong> Transmiten movimiento de forma suave</li>
              <li><strong>Pistones:</strong> Convierten movimiento lineal en rotacional</li>
            </ul>
            
            <h3>Eficiencia de las Máquinas</h3>
            <p>Ninguna máquina es 100% eficiente debido a:</p>
            <ul>
              <li>Fricción entre las partes móviles</li>
              <li>Pérdidas de energía como calor</li>
              <li>Resistencia del aire</li>
            </ul>
            
            <p>Entender las máquinas nos ayuda a apreciar la ingeniería que hay detrás de los objetos que usamos todos los días.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Energía?</h2>
            <p>La energía es la capacidad de realizar trabajo o producir cambios. No podemos ver la energía directamente, pero podemos observar sus efectos cuando mueve objetos, genera calor, produce luz o hace funcionar máquinas.</p>
            
            <h3>Formas de Energía</h3>
            <p>La energía se presenta en diferentes formas:</p>
            <ul>
              <li><strong>Cinética:</strong> Energía del movimiento (un auto en movimiento)</li>
              <li><strong>Potencial:</strong> Energía almacenada por posición (agua en una presa)</li>
              <li><strong>Térmica:</strong> Energía del calor (agua caliente)</li>
              <li><strong>Eléctrica:</strong> Energía de cargas eléctricas (electricidad)</li>
              <li><strong>Química:</strong> Energía en enlaces químicos (gasolina, alimentos)</li>
              <li><strong>Nuclear:</strong> Energía en el núcleo de átomos</li>
              <li><strong>Solar:</strong> Energía de la luz del sol</li>
            </ul>
            
            <h3>Fuentes de Energía</h3>
            <p>Obtenemos energía de diferentes fuentes:</p>
            <ul>
              <li><strong>Renovables:</strong>
                <ul>
                  <li>Solar (paneles solares)</li>
                  <li>Eólica (molinos de viento)</li>
                  <li>Hidráulica (presas)</li>
                  <li>Biomasa (madera, biocombustibles)</li>
                  <li>Geotérmica (calor de la Tierra)</li>
                </ul>
              </li>
              <li><strong>No renovables:</strong>
                <ul>
                  <li>Petróleo</li>
                  <li>Gas natural</li>
                  <li>Carbón</li>
                  <li>Uranio (nuclear)</li>
                </ul>
              </li>
            </ul>
            
            <h3>Transformación de Energía</h3>
            <p>La energía puede transformarse de una forma a otra:</p>
            <ul>
              <li>Química → Cinética (motor de auto)</li>
              <li>Solar → Eléctrica (paneles solares)</li>
              <li>Eléctrica → Lumínica (bombillo)</li>
              <li>Potencial → Cinética (agua cayendo)</li>
              <li>Cinética → Eléctrica (generador)</li>
            </ul>
            
            <h3>Conservación de Energía</h3>
            <p>La energía no se crea ni se destruye, solo se transforma:</p>
            <ul>
              <li>La cantidad total de energía siempre se conserva</li>
              <li>Algunas transformaciones son más eficientes que otras</li>
              <li>Siempre se pierde energía como calor</li>
            </ul>
            
            <h3>Uso Eficiente de la Energía</h3>
            <p>Es importante usar la energía de manera inteligente:</p>
            <ul>
              <li>Apagar luces cuando no las necesitamos</li>
              <li>Usar aparatos eficientes</li>
              <li>Aislar bien las casas</li>
              <li>Usar transporte público</li>
              <li>Desarrollar tecnologías más eficientes</li>
            </ul>
            
            <h3>Energía del Futuro</h3>
            <p>Los ingenieros trabajan en nuevas formas de energía:</p>
            <ul>
              <li>Mejores paneles solares</li>
              <li>Baterías más eficientes</li>
              <li>Energía de las olas del mar</li>
              <li>Hidrógeno como combustible</li>
              <li>Fusión nuclear</li>
            </ul>
            
            <p>Entender la energía nos ayuda a tomar mejores decisiones sobre cómo usamos los recursos de nuestro planeta.</p>
          `
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
          contenido: `
            <h2>El Pensamiento de Diseño</h2>
            <p>Los ingenieros utilizan un proceso especial llamado "pensamiento de diseño" para resolver problemas complejos. Este proceso combina creatividad, lógica y experimentación para encontrar las mejores soluciones.</p>
            
            <h3>Pasos del Proceso de Diseño</h3>
            <p>El proceso de diseño en ingeniería sigue estos pasos:</p>
            <ul>
              <li><strong>1. Empatizar:</strong> Entender las necesidades de los usuarios</li>
              <li><strong>2. Definir:</strong> Identificar claramente el problema</li>
              <li><strong>3. Idear:</strong> Generar muchas ideas creativas</li>
              <li><strong>4. Prototipar:</strong> Construir versiones simples para probar</li>
              <li><strong>5. Probar:</strong> Evaluar y mejorar el diseño</li>
              <li><strong>6. Iterar:</strong> Repetir el proceso para mejorar</li>
            </ul>
            
            <h3>Técnicas de Generación de Ideas</h3>
            <p>Los ingenieros usan diferentes técnicas para generar ideas:</p>
            <ul>
              <li><strong>Lluvia de ideas:</strong> Generar muchas ideas sin juzgar</li>
              <li><strong>Mapas mentales:</strong> Conectar ideas visualmente</li>
              <li><strong>Analogías:</strong> Buscar soluciones en la naturaleza</li>
              <li><strong>Preguntas "¿Y si...?":</strong> Explorar posibilidades</li>
              <li><strong>Reverse engineering:</strong> Desmontar para entender</li>
            </ul>
            
            <h3>Restricciones en el Diseño</h3>
            <p>Los ingenieros deben considerar limitaciones:</p>
            <ul>
              <li><strong>Económicas:</strong> Cuánto dinero está disponible</li>
              <li><strong>Materiales:</strong> Qué materiales se pueden usar</li>
              <li><strong>Tiempo:</strong> Cuándo debe estar lista la solución</li>
              <li><strong>Ambientales:</strong> Impacto en el medio ambiente</li>
              <li><strong>Seguridad:</strong> La solución debe ser segura</li>
              <li><strong>Estéticas:</strong> Cómo debe verse</li>
            </ul>
            
            <h3>Prototipado</h3>
            <p>Los prototipos son versiones tempranas del diseño:</p>
            <ul>
              <li>Permiten probar ideas rápidamente</li>
              <li>Ayudan a encontrar problemas antes</li>
              <li>Son más baratos que el producto final</li>
              <li>Pueden ser de papel, cartón, o digitales</li>
              <li>Se mejoran basándose en las pruebas</li>
            </ul>
            
            <h3>Evaluación y Mejora</h3>
            <p>Los diseños se evalúan usando criterios específicos:</p>
            <ul>
              <li>¿Resuelve el problema original?</li>
              <li>¿Es seguro de usar?</li>
              <li>¿Es fácil de fabricar?</li>
              <li>¿Es económicamente viable?</li>
              <li>¿Los usuarios lo encuentran útil?</li>
            </ul>
            
            <h3>Ejemplos de Diseño en la Vida Real</h3>
            <p>El proceso de diseño se usa en muchas áreas:</p>
            <ul>
              <li>Diseño de aplicaciones móviles</li>
              <li>Creación de nuevos medicamentos</li>
              <li>Desarrollo de automóviles más seguros</li>
              <li>Diseño de prótesis para personas</li>
              <li>Creación de juguetes educativos</li>
            </ul>
            
            <h3>Trabajo en Equipo</h3>
            <p>Los ingenieros raramente trabajan solos:</p>
            <ul>
              <li>Diferentes personas aportan diferentes habilidades</li>
              <li>El trabajo en equipo genera mejores ideas</li>
              <li>Se pueden resolver problemas más complejos</li>
              <li>Es importante saber comunicar y colaborar</li>
            </ul>
            
            <p>Aprender a pensar como un ingeniero nos ayuda a resolver problemas en todos los aspectos de la vida.</p>
          `
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
          contenido: `
            <h2>¿Qué es el Arte?</h2>
            <p>El arte es una forma de expresión humana que utiliza la creatividad, la imaginación y la habilidad técnica para comunicar ideas, emociones y experiencias a través de diversos medios y formas.</p>
            
            <h3>Disciplinas Artísticas Principales</h3>
            <p>El arte abarca muchas disciplinas diferentes:</p>
            <ul>
              <li><strong>Artes Visuales:</strong> Pintura, dibujo, escultura, fotografía</li>
              <li><strong>Artes Escénicas:</strong> Teatro, danza, música, ópera</li>
              <li><strong>Artes Literarias:</strong> Poesía, narrativa, ensayo</li>
              <li><strong>Artes Digitales:</strong> Arte por computadora, animación, multimedia</li>
              <li><strong>Artes Aplicadas:</strong> Diseño gráfico, moda, arquitectura</li>
            </ul>
            
            <h3>Elementos del Arte</h3>
            <p>Los artistas trabajan con elementos fundamentales:</p>
            <ul>
              <li><strong>Línea:</strong> Define formas y contornos</li>
              <li><strong>Forma:</strong> Figuras bidimensionales y tridimensionales</li>
              <li><strong>Color:</strong> Crea ambiente y transmite emociones</li>
              <li><strong>Textura:</strong> La superficie y sensación táctil</li>
              <li><strong>Espacio:</strong> La organización de elementos en el área</li>
              <li><strong>Ritmo:</strong> La repetición y flujo de elementos</li>
            </ul>
            
            <h3>Historia del Arte</h3>
            <p>El arte ha evolucionado a través de la historia:</p>
            <ul>
              <li><strong>Arte Prehistórico:</strong> Pinturas rupestres y esculturas primitivas</li>
              <li><strong>Arte Clásico:</strong> Grecia y Roma antigua</li>
              <li><strong>Renacimiento:</strong> Leonardo da Vinci, Miguel Ángel</li>
              <li><strong>Arte Moderno:</strong> Impresionismo, cubismo, surrealismo</li>
              <li><strong>Arte Contemporáneo:</strong> Nuevas tecnologías y medios</li>
            </ul>
            
            <h3>El Arte en la Vida Cotidiana</h3>
            <p>El arte está presente en muchos aspectos de nuestra vida:</p>
            <ul>
              <li>Decoración de espacios y diseño de interiores</li>
              <li>Música que escuchamos y películas que vemos</li>
              <li>Diseño de productos y publicidad</li>
              <li>Moda y estilo personal</li>
              <li>Entretenimiento y cultura popular</li>
            </ul>
            
            <p>El arte no solo embellece nuestro mundo, sino que también nos ayuda a entender diferentes perspectivas y culturas, desarrollando nuestra creatividad y sensibilidad estética.</p>
          `
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
          contenido: `
            <h2>El Arte de Pintar y Dibujar</h2>
            <p>La pintura y el dibujo son dos de las formas más antiguas y populares de expresión artística. A través de líneas, colores y formas, los artistas pueden crear mundos imaginarios, retratar la realidad o expresar emociones profundas.</p>
            
            <h3>Materiales de Dibujo</h3>
            <p>Los artistas usan diversos materiales para dibujar:</p>
            <ul>
              <li><strong>Lápices de grafito:</strong> Desde suaves (B) hasta duros (H)</li>
              <li><strong>Carboncillo:</strong> Para sombras dramáticas y texturas</li>
              <li><strong>Lápices de colores:</strong> Para agregar color al dibujo</li>
              <li><strong>Marcadores:</strong> Para líneas bold y colores vibrantes</li>
              <li><strong>Pasteles:</strong> Para efectos suaves y difuminados</li>
              <li><strong>Tinta:</strong> Para líneas precisas y contrastes fuertes</li>
            </ul>
            
            <h3>Técnicas de Dibujo</h3>
            <p>Existen diferentes técnicas que los artistas pueden usar:</p>
            <ul>
              <li><strong>Línea:</strong> Dibujos basados principalmente en contornos</li>
              <li><strong>Sombreado:</strong> Crear profundidad con luces y sombras</li>
              <li><strong>Textura:</strong> Representar diferentes superficies</li>
              <li><strong>Perspectiva:</strong> Crear sensación de profundidad y espacio</li>
              <li><strong>Proporción:</strong> Mantener relaciones correctas entre partes</li>
            </ul>
            
            <h3>Tipos de Pintura</h3>
            <p>Los pintores utilizan diferentes tipos de pintura:</p>
            <ul>
              <li><strong>Acuarela:</strong> Transparente, se mezcla con agua</li>
              <li><strong>Óleo:</strong> Colores ricos, se seca lentamente</li>
              <li><strong>Acrílica:</strong> Versátil, se seca rápidamente</li>
              <li><strong>Tempera:</strong> Opaca, buena para principiantes</li>
              <li><strong>Pastel:</strong> Suave, ideal para retratos</li>
            </ul>
            
            <h3>Elementos de Composición</h3>
            <p>Para crear obras efectivas, los artistas consideran:</p>
            <ul>
              <li><strong>Punto focal:</strong> El área más importante de la obra</li>
              <li><strong>Equilibrio:</strong> Distribución visual de elementos</li>
              <li><strong>Movimiento:</strong> Cómo el ojo se mueve por la obra</li>
              <li><strong>Contraste:</strong> Diferencias que crean interés visual</li>
              <li><strong>Armonía:</strong> Elementos que trabajan juntos</li>
            </ul>
            
            <h3>Géneros de Pintura</h3>
            <p>Los pintores trabajan en diferentes géneros:</p>
            <ul>
              <li><strong>Retrato:</strong> Representación de personas</li>
              <li><strong>Paisaje:</strong> Escenas naturales o urbanas</li>
              <li><strong>Naturaleza muerta:</strong> Objetos inanimados</li>
              <li><strong>Arte abstracto:</strong> Formas y colores no representativos</li>
              <li><strong>Arte figurativo:</strong> Representación reconocible de objetos</li>
            </ul>
            
            <h3>El Color en el Arte</h3>
            <p>El color es fundamental en la pintura:</p>
            <ul>
              <li>Colores primarios: rojo, azul, amarillo</li>
              <li>Colores secundarios: verde, naranja, morado</li>
              <li>Colores cálidos: rojos, naranjas, amarillos</li>
              <li>Colores fríos: azules, verdes, morados</li>
              <li>Los colores pueden expresar emociones y ambiente</li>
            </ul>
            
            <p>La pintura y el dibujo son habilidades que se desarrollan con práctica y paciencia, pero que ofrecen una forma única de ver y expresar el mundo.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Música?</h2>
            <p>La música es el arte de combinar sonidos en el tiempo de manera que sea agradable al oído. Utiliza elementos como ritmo, melodía y armonía para crear experiencias emocionales y estéticas únicas.</p>
            
            <h3>Elementos Básicos de la Música</h3>
            <p>La música se construye con varios elementos fundamentales:</p>
            <ul>
              <li><strong>Ritmo:</strong> El patrón temporal de los sonidos</li>
              <li><strong>Melodía:</strong> La secuencia de notas que forman la "canción"</li>
              <li><strong>Armonía:</strong> La combinación de sonidos simultáneos</li>
              <li><strong>Timbre:</strong> El "color" o calidad única de cada sonido</li>
              <li><strong>Volumen:</strong> Qué tan fuerte o suave es el sonido</li>
              <li><strong>Tempo:</strong> Qué tan rápida o lenta es la música</li>
            </ul>
            
            <h3>Instrumentos Musicales</h3>
            <p>Los instrumentos se clasifican en familias:</p>
            <ul>
              <li><strong>Cuerda:</strong> Guitarra, violín, piano (cuerdas martilladas)</li>
              <li><strong>Viento:</strong> Flauta, trompeta, clarinete, saxofón</li>
              <li><strong>Percusión:</strong> Tambores, xilófono, maracas, triángulo</li>
              <li><strong>Electrónicos:</strong> Sintetizadores, computadoras, samplers</li>
              <li><strong>Voz humana:</strong> El instrumento más natural y expresivo</li>
            </ul>
            
            <h3>Géneros Musicales</h3>
            <p>La música se expresa en muchos géneros diferentes:</p>
            <ul>
              <li><strong>Clásica:</strong> Orquestas, sinfonías, óperas</li>
              <li><strong>Pop:</strong> Música popular contemporánea</li>
              <li><strong>Rock:</strong> Guitarra eléctrica, ritmo fuerte</li>
              <li><strong>Jazz:</strong> Improvisación y ritmos complejos</li>
              <li><strong>Folk:</strong> Música tradicional de diferentes culturas</li>
              <li><strong>Electrónica:</strong> Música creada con computadoras</li>
            </ul>
            
            <h3>Cómo Funciona el Sonido</h3>
            <p>Para entender la música, es útil saber sobre el sonido:</p>
            <ul>
              <li>El sonido viaja en ondas por el aire</li>
              <li>Frecuencias altas = sonidos agudos</li>
              <li>Frecuencias bajas = sonidos graves</li>
              <li>Nuestros oídos detectan vibraciones del aire</li>
              <li>El cerebro interpreta estas vibraciones como música</li>
            </ul>
            
            <h3>La Música en Diferentes Culturas</h3>
            <p>Cada cultura tiene sus propias tradiciones musicales:</p>
            <ul>
              <li>África: Ritmos complejos y percusión</li>
              <li>India: Escalas microtonales y sitar</li>
              <li>China: Instrumentos tradicionales como el erhu</li>
              <li>América Latina: Salsa, tango, mariachi</li>
              <li>Europa: Música clásica, folk regional</li>
            </ul>
            
            <h3>Beneficios de la Música</h3>
            <p>La música aporta muchos beneficios:</p>
            <ul>
              <li>Desarrolla habilidades cognitivas</li>
              <li>Mejora la memoria y concentración</li>
              <li>Ayuda a expresar emociones</li>
              <li>Facilita la socialización</li>
              <li>Reduce el estrés y la ansiedad</li>
              <li>Estimula la creatividad</li>
            </ul>
            
            <h3>Crear Música Hoy</h3>
            <p>La tecnología ha democratizado la creación musical:</p>
            <ul>
              <li>Aplicaciones móviles para hacer música</li>
              <li>Software de grabación en computadoras</li>
              <li>Instrumentos virtuales</li>
              <li>Plataformas para compartir música online</li>
              <li>Colaboración musical a distancia</li>
            </ul>
            
            <p>La música es un lenguaje universal que conecta a las personas más allá de las barreras culturales y lingüísticas.</p>
          `
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
          contenido: `
            <h2>¿Qué es el Teatro?</h2>
            <p>El teatro es una forma de arte escénico donde actores interpretan una historia frente a una audiencia en vivo. Combina actuación, diálogo, música, danza, escenografía y vestuario para crear una experiencia completa y emotiva.</p>
            
            <h3>Elementos del Teatro</h3>
            <p>Una producción teatral incluye varios elementos clave:</p>
            <ul>
              <li><strong>Actuación:</strong> Los actores dan vida a los personajes</li>
              <li><strong>Guión:</strong> El texto que dice cada personaje</li>
              <li><strong>Escenografía:</strong> El diseño visual del escenario</li>
              <li><strong>Vestuario:</strong> La ropa que define a cada personaje</li>
              <li><strong>Iluminación:</strong> Luces que crean ambiente y mood</li>
              <li><strong>Sonido:</strong> Efectos sonoros y música de fondo</li>
              <li><strong>Dirección:</strong> Quien coordina todos los elementos</li>
            </ul>
            
            <h3>Tipos de Teatro</h3>
            <p>Existen diferentes géneros teatrales:</p>
            <ul>
              <li><strong>Comedia:</strong> Obras que buscan hacer reír y entretener</li>
              <li><strong>Drama:</strong> Historias serias sobre la condición humana</li>
              <li><strong>Tragedia:</strong> Obras que exploran temas profundos y tristes</li>
              <li><strong>Musical:</strong> Combina actuación, canto y baile</li>
              <li><strong>Teatro infantil:</strong> Especialmente diseñado para niños</li>
              <li><strong>Teatro experimental:</strong> Formas innovadoras de presentación</li>
            </ul>
            
            <h3>Habilidades de Actuación</h3>
            <p>Los actores desarrollan diversas habilidades:</p>
            <ul>
              <li><strong>Expresión vocal:</strong> Proyección, dicción, tono</li>
              <li><strong>Expresión corporal:</strong> Gestos, postura, movimiento</li>
              <li><strong>Empatía:</strong> Entender y sentir como el personaje</li>
              <li><strong>Memorización:</strong> Aprender diálogos y marcas</li>
              <li><strong>Improvisación:</strong> Crear diálogos espontáneamente</li>
              <li><strong>Trabajo en equipo:</strong> Colaborar con otros actores</li>
            </ul>
            
            <h3>El Proceso Creativo</h3>
            <p>Crear una obra de teatro involucra varios pasos:</p>
            <ul>
              <li>Selección o escritura del guión</li>
              <li>Audiciones para elegir actores</li>
              <li>Ensayos para practicar y perfeccionar</li>
              <li>Diseño de escenografía y vestuario</li>
              <li>Técnicos de luces y sonido</li>
              <li>Presentaciones ante el público</li>
            </ul>
            
            <h3>Historia del Teatro</h3>
            <p>El teatro tiene una larga historia:</p>
            <ul>
              <li><strong>Grecia Antigua:</strong> Origen del teatro occidental</li>
              <li><strong>Edad Media:</strong> Teatro religioso y moral</li>
              <li><strong>Renacimiento:</strong> Shakespeare y el teatro isabelino</li>
              <li><strong>Siglo XX:</strong> Teatro realista y experimental</li>
              <li><strong>Teatro moderno:</strong> Nuevas tecnologías y formatos</li>
            </ul>
            
            <h3>Beneficios del Teatro</h3>
            <p>Participar en teatro aporta muchos beneficios:</p>
            <ul>
              <li>Desarrolla confianza y autoestima</li>
              <li>Mejora habilidades de comunicación</li>
              <li>Fomenta la creatividad y imaginación</li>
              <li>Enseña trabajo en equipo</li>
              <li>Desarrolla empatía y comprensión</li>
              <li>Proporciona una forma de expresión personal</li>
            </ul>
            
            <h3>Teatro en la Educación</h3>
            <p>El teatro es una herramienta educativa valiosa:</p>
            <ul>
              <li>Ayuda a entender literatura e historia</li>
              <li>Desarrolla habilidades de lectura</li>
              <li>Fomenta la participación activa</li>
              <li>Mejora la memoria y concentración</li>
              <li>Enseña sobre diferentes culturas</li>
            </ul>
            
            <p>El teatro nos conecta con nuestras emociones y nos permite explorar diferentes perspectivas sobre la vida humana.</p>
          `
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
          contenido: `
            <h2>¿Qué es el Arte Digital?</h2>
            <p>El arte digital es cualquier obra artística creada usando tecnología digital. Incluye desde dibujos hechos en computadora hasta instalaciones interactivas complejas que responden al público usando sensores y programación.</p>
            
            <h3>Herramientas del Arte Digital</h3>
            <p>Los artistas digitales utilizan diversas herramientas:</p>
            <ul>
              <li><strong>Software de dibujo:</strong> Photoshop, Procreate, Krita</li>
              <li><strong>Tabletas gráficas:</strong> Para dibujar directamente en pantalla</li>
              <li><strong>Software 3D:</strong> Blender, Maya para crear modelos tridimensionales</li>
              <li><strong>Programas de animación:</strong> After Effects, Animate</li>
              <li><strong>Software de música:</strong> Para crear bandas sonoras</li>
              <li><strong>Motores de videojuegos:</strong> Unity, Unreal Engine</li>
            </ul>
            
            <h3>Tipos de Arte Digital</h3>
            <p>El arte digital abarca muchas formas:</p>
            <ul>
              <li><strong>Ilustración digital:</strong> Dibujos y pinturas en computadora</li>
              <li><strong>Animación:</strong> Imágenes que se mueven y cobran vida</li>
              <li><strong>Arte 3D:</strong> Esculturas y mundos virtuales</li>
              <li><strong>Arte interactivo:</strong> Obras que responden al público</li>
              <li><strong>Arte generativo:</strong> Creado por algoritmos y código</li>
              <li><strong>Realidad virtual:</strong> Experiencias inmersivas</li>
              <li><strong>Arte de videojuegos:</strong> Mundos y personajes de juegos</li>
            </ul>
            
            <h3>Multimedia en el Arte</h3>
            <p>El arte multimedia combina diferentes medios:</p>
            <ul>
              <li>Video + audio + texto</li>
              <li>Imágenes + sonido + interactividad</li>
              <li>Animación + música + efectos especiales</li>
              <li>Realidad virtual + narración + experiencia física</li>
              <li>Internet + comunidad + participación colaborativa</li>
            </ul>
            
            <h3>Proceso Creativo Digital</h3>
            <p>Crear arte digital sigue un proceso específico:</p>
            <ul>
              <li><strong>Concepto:</strong> Idea inicial y planificación</li>
              <li><strong>Bocetos:</strong> Primeras ideas visuales</li>
              <li><strong>Prototipo:</strong> Versión básica para probar</li>
              <li><strong>Desarrollo:</strong> Crear la obra final</li>
              <li><strong>Pruebas:</strong> Verificar que funcione correctamente</li>
              <li><strong>Publicación:</strong> Compartir con el público</li>
            </ul>
            
            <h3>Arte en Internet</h3>
            <p>Internet ha revolucionado la forma de crear y compartir arte:</p>
            <ul>
              <li>Galerías virtuales para exhibir obras</li>
              <li>Redes sociales para artistas</li>
              <li>Colaboraciones artísticas a distancia</li>
              <li>Arte que existe solo en línea</li>
              <li>Comunidades de artistas globales</li>
              <li>Venta directa de arte digital</li>
            </ul>
            
            <h3>Ventajas del Arte Digital</h3>
            <p>El arte digital ofrece muchas posibilidades:</p>
            <ul>
              <li>Fácil corrección y experimentación</li>
              <li>Costos menores (no necesita materiales físicos)</li>
              <li>Fácil distribución y copia</li>
              <li>Posibilidades infinitas de color y efectos</li>
              <li>Integración con otras tecnologías</li>
              <li>Acceso global instantáneo</li>
            </ul>
            
            <h3>Desafíos del Arte Digital</h3>
            <p>También presenta algunos desafíos:</p>
            <ul>
              <li>Dependencia de la tecnología</li>
              <li>Obsolescencia de formatos</li>
              <li>Dificultad para valorar obras únicas</li>
              <li>Necesidad de actualizar conocimientos constantemente</li>
              <li>Competencia con inteligencia artificial</li>
            </ul>
            
            <h3>El Futuro del Arte Digital</h3>
            <p>Las tendencias emergentes incluyen:</p>
            <ul>
              <li>Arte creado con inteligencia artificial</li>
              <li>Experiencias de realidad aumentada</li>
              <li>Arte blockchain y NFTs</li>
              <li>Instalaciones responsivas al ambiente</li>
              <li>Colaboración humano-máquina</li>
            </ul>
            
            <p>El arte digital representa una nueva frontera creativa que combina la expresión artística tradicional con las posibilidades infinitas de la tecnología.</p>
          `
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
          contenido: `
            <h2>¿Qué son las Matemáticas?</h2>
            <p>Las matemáticas son el lenguaje universal que nos permite entender, describir y predecir patrones en el mundo que nos rodea. Desde el crecimiento de las plantas hasta el movimiento de los planetas, todo puede explicarse con matemáticas.</p>
            
            <h3>Ramas de las Matemáticas</h3>
            <p>Las matemáticas se dividen en diferentes áreas de estudio:</p>
            <ul>
              <li><strong>Aritmética:</strong> Operaciones básicas con números</li>
              <li><strong>Álgebra:</strong> Uso de variables y ecuaciones</li>
              <li><strong>Geometría:</strong> Formas, espacios y sus propiedades</li>
              <li><strong>Estadística:</strong> Análisis de datos y probabilidades</li>
              <li><strong>Cálculo:</strong> Cambios y movimiento continuo</li>
              <li><strong>Matemáticas Discretas:</strong> Lógica y estructuras finitas</li>
            </ul>
            
            <h3>Matemáticas en la Naturaleza</h3>
            <p>Las matemáticas aparecen en patrones naturales sorprendentes:</p>
            <ul>
              <li><strong>Secuencia de Fibonacci:</strong> En girasoles, caracolas y piñas</li>
              <li><strong>Proporción Áurea:</strong> En el cuerpo humano y obras de arte</li>
              <li><strong>Fractales:</strong> En copos de nieve, hojas y costas</li>
              <li><strong>Ondas:</strong> En el sonido, la luz y el agua</li>
              <li><strong>Espirales:</strong> En galaxias, huracanes y caracolas</li>
            </ul>
            
            <h3>Matemáticas en la Vida Diaria</h3>
            <p>Usamos matemáticas constantemente sin darnos cuenta:</p>
            <ul>
              <li>Calcular el tiempo y planificar actividades</li>
              <li>Manejar dinero y hacer presupuestos</li>
              <li>Cocinar siguiendo recetas y proporciones</li>
              <li>Deportes: estadísticas, puntuaciones, estrategias</li>
              <li>Tecnología: algoritmos en redes sociales y GPS</li>
              <li>Arte y música: simetría, ritmo y armonía</li>
            </ul>
            
            <h3>Herramientas Matemáticas</h3>
            <p>Los matemáticos utilizan diferentes herramientas:</p>
            <ul>
              <li>Números y operaciones para calcular</li>
              <li>Gráficos y diagramas para visualizar</li>
              <li>Fórmulas y ecuaciones para resolver problemas</li>
              <li>Lógica y razonamiento para demostrar teorías</li>
              <li>Computadoras para cálculos complejos</li>
            </ul>
            
            <p>Las matemáticas no solo nos ayudan a resolver problemas prácticos, sino que también desarrollan nuestro pensamiento lógico y nuestra capacidad de análisis.</p>
          `
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
          contenido: `
            <h2>El Sistema de Números</h2>
            <p>Los números son símbolos que representan cantidades. El sistema que usamos hoy se llama sistema decimal porque se basa en grupos de diez, y utiliza los dígitos del 0 al 9.</p>
            
            <h3>Tipos de Números</h3>
            <p>Existen diferentes tipos de números:</p>
            <ul>
              <li><strong>Números Naturales:</strong> 1, 2, 3, 4, 5... (para contar)</li>
              <li><strong>Números Enteros:</strong> ...-2, -1, 0, 1, 2... (incluyen negativos)</li>
              <li><strong>Números Decimales:</strong> 1.5, 3.14, 0.25... (con punto decimal)</li>
              <li><strong>Fracciones:</strong> 1/2, 3/4, 2/3... (partes de un entero)</li>
              <li><strong>Números Pares:</strong> 2, 4, 6, 8... (divisibles por 2)</li>
              <li><strong>Números Impares:</strong> 1, 3, 5, 7... (no divisibles por 2)</li>
            </ul>
            
            <h3>Las Cuatro Operaciones Básicas</h3>
            <p>Las operaciones fundamentales son:</p>
            <ul>
              <li><strong>Suma (+):</strong> Juntar cantidades (3 + 2 = 5)</li>
              <li><strong>Resta (-):</strong> Quitar cantidades (5 - 2 = 3)</li>
              <li><strong>Multiplicación (×):</strong> Sumar un número varias veces (3 × 4 = 12)</li>
              <li><strong>División (÷):</strong> Repartir en partes iguales (12 ÷ 3 = 4)</li>
            </ul>
            
            <h3>Propiedades de las Operaciones</h3>
            <p>Las operaciones tienen propiedades útiles:</p>
            <ul>
              <li><strong>Propiedad Conmutativa:</strong> 3 + 5 = 5 + 3</li>
              <li><strong>Propiedad Asociativa:</strong> (2 + 3) + 4 = 2 + (3 + 4)</li>
              <li><strong>Elemento Neutro:</strong> 5 + 0 = 5, 7 × 1 = 7</li>
              <li><strong>Propiedad Distributiva:</strong> 2 × (3 + 4) = 2 × 3 + 2 × 4</li>
            </ul>
            
            <h3>Valor Posicional</h3>
            <p>En nuestro sistema, la posición de cada dígito tiene un valor:</p>
            <ul>
              <li>En 1,234: 1 = mil, 2 = cien, 3 = diez, 4 = uno</li>
              <li>Cada posición vale 10 veces más que la anterior</li>
              <li>Esto nos permite escribir números muy grandes o muy pequeños</li>
            </ul>
            
            <h3>Fracciones y Decimales</h3>
            <p>Las fracciones y decimales representan partes de un entero:</p>
            <ul>
              <li>1/2 = 0.5 = la mitad</li>
              <li>1/4 = 0.25 = un cuarto</li>
              <li>3/4 = 0.75 = tres cuartos</li>
              <li>Son útiles para medidas precisas</li>
            </ul>
            
            <h3>Orden de Operaciones</h3>
            <p>Cuando hay varias operaciones, seguimos un orden:</p>
            <ul>
              <li>1. Paréntesis primero: ( )</li>
              <li>2. Multiplicación y división de izquierda a derecha</li>
              <li>3. Suma y resta de izquierda a derecha</li>
              <li>Ejemplo: 2 + 3 × 4 = 2 + 12 = 14</li>
            </ul>
            
            <h3>Estimación y Redondeo</h3>
            <p>A veces no necesitamos respuestas exactas:</p>
            <ul>
              <li>Redondear 47 a 50 para cálculos rápidos</li>
              <li>Estimar antes de calcular para verificar respuestas</li>
              <li>Útil para decisiones rápidas en la vida real</li>
            </ul>
            
            <p>Dominar los números y operaciones básicas es fundamental para todo lo demás en matemáticas y en la vida práctica.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Geometría?</h2>
            <p>La geometría es la rama de las matemáticas que estudia las formas, tamaños, posiciones y propiedades del espacio. Nos ayuda a entender el mundo visual que nos rodea y es fundamental en arquitectura, arte y diseño.</p>
            
            <h3>Formas Básicas 2D (Bidimensionales)</h3>
            <p>Las formas planas tienen largo y ancho, pero no altura:</p>
            <ul>
              <li><strong>Círculo:</strong> Forma redonda perfecta, todos los puntos equidistantes del centro</li>
              <li><strong>Cuadrado:</strong> Cuatro lados iguales, cuatro ángulos rectos</li>
              <li><strong>Rectángulo:</strong> Cuatro lados, lados opuestos iguales, cuatro ángulos rectos</li>
              <li><strong>Triángulo:</strong> Tres lados y tres ángulos</li>
              <li><strong>Pentágono:</strong> Cinco lados</li>
              <li><strong>Hexágono:</strong> Seis lados</li>
            </ul>
            
            <h3>Formas 3D (Tridimensionales)</h3>
            <p>Los sólidos tienen largo, ancho y altura:</p>
            <ul>
              <li><strong>Esfera:</strong> Como una pelota, perfectamente redonda</li>
              <li><strong>Cubo:</strong> Seis caras cuadradas iguales</li>
              <li><strong>Cilindro:</strong> Como un tubo, con bases circulares</li>
              <li><strong>Cono:</strong> Base circular que se estrecha hacia un punto</li>
              <li><strong>Pirámide:</strong> Base poligonal que se estrecha hacia un punto</li>
            </ul>
            
            <h3>Líneas y Ángulos</h3>
            <p>Los elementos básicos de la geometría:</p>
            <ul>
              <li><strong>Punto:</strong> Una posición exacta en el espacio</li>
              <li><strong>Línea:</strong> Se extiende infinitamente en ambas direcciones</li>
              <li><strong>Segmento:</strong> Parte de una línea entre dos puntos</li>
              <li><strong>Ángulo recto:</strong> 90 grados, como la esquina de un cuadrado</li>
              <li><strong>Ángulo agudo:</strong> Menor de 90 grados</li>
              <li><strong>Ángulo obtuso:</strong> Mayor de 90 grados</li>
            </ul>
            
            <h3>Perímetro y Área</h3>
            <p>Medidas importantes de las formas:</p>
            <ul>
              <li><strong>Perímetro:</strong> La distancia alrededor de una forma</li>
              <li><strong>Área:</strong> El espacio dentro de una forma</li>
              <li>Perímetro del cuadrado: 4 × lado</li>
              <li>Área del cuadrado: lado × lado</li>
              <li>Área del triángulo: (base × altura) ÷ 2</li>
            </ul>
            
            <h3>Simetría</h3>
            <p>Muchas formas tienen simetría:</p>
            <ul>
              <li>Simetría de reflexión: se ve igual en un espejo</li>
              <li>Simetría rotacional: se ve igual al girar</li>
              <li>Los círculos tienen infinitas líneas de simetría</li>
              <li>Los cuadrados tienen 4 líneas de simetría</li>
              <li>La simetría crea belleza en arte y naturaleza</li>
            </ul>
            
            <h3>Geometría en la Naturaleza</h3>
            <p>Las formas geométricas aparecen naturalmente:</p>
            <ul>
              <li>Hexágonos en panales de abejas</li>
              <li>Círculos en gotas de agua</li>
              <li>Espirales en caracolas</li>
              <li>Triángulos en montañas</li>
              <li>Cilindros en troncos de árboles</li>
            </ul>
            
            <h3>Aplicaciones de la Geometría</h3>
            <p>La geometría es útil en muchas áreas:</p>
            <ul>
              <li>Arquitectura: diseñar edificios estables</li>
              <li>Arte: crear composiciones equilibradas</li>
              <li>Ingeniería: construir máquinas eficientes</li>
              <li>Navegación: calcular distancias y direcciones</li>
              <li>Deportes: estrategias y cálculo de trayectorias</li>
            </ul>
            
            <p>La geometría nos ayuda a entender y describir el espacio que nos rodea, siendo fundamental para el diseño y la construcción.</p>
          `
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
          contenido: `
            <h2>¿Qué son los Patrones?</h2>
            <p>Un patrón es algo que se repite de manera regular y predecible. Los patrones están en todas partes: en la naturaleza, el arte, la música y las matemáticas. Reconocer patrones nos ayuda a entender el mundo y hacer predicciones.</p>
            
            <h3>Tipos de Patrones Numéricos</h3>
            <p>Los números pueden formar diferentes tipos de patrones:</p>
            <ul>
              <li><strong>Patrón de suma:</strong> 2, 4, 6, 8, 10... (+2 cada vez)</li>
              <li><strong>Patrón de multiplicación:</strong> 3, 6, 12, 24, 48... (×2 cada vez)</li>
              <li><strong>Números pares:</strong> 2, 4, 6, 8, 10, 12...</li>
              <li><strong>Números impares:</strong> 1, 3, 5, 7, 9, 11...</li>
              <li><strong>Múltiplos:</strong> Múltiplos de 5: 5, 10, 15, 20, 25...</li>
            </ul>
            
            <h3>La Secuencia de Fibonacci</h3>
            <p>Una de las secuencias más famosas en matemáticas:</p>
            <ul>
              <li>Comienza: 1, 1, 2, 3, 5, 8, 13, 21, 34...</li>
              <li>Cada número es la suma de los dos anteriores</li>
              <li>Aparece en girasoles, caracolas, piñas</li>
              <li>Se relaciona con la proporción áurea</li>
              <li>Se encuentra en el arte y la arquitectura</li>
            </ul>
            
            <h3>Patrones Geométricos</h3>
            <p>Las formas también pueden crear patrones:</p>
            <ul>
              <li>Alternancia de formas: círculo, cuadrado, círculo, cuadrado...</li>
              <li>Crecimiento de tamaño: pequeño, mediano, grande, pequeño...</li>
              <li>Rotación: ↑, →, ↓, ←, ↑, →...</li>
              <li>Colores alternados: rojo, azul, rojo, azul...</li>
              <li>Teselaciones: patrones que llenan el espacio sin huecos</li>
            </ul>
            
            <h3>Patrones en la Naturaleza</h3>
            <p>La naturaleza está llena de patrones matemáticos:</p>
            <ul>
              <li><strong>Espirales:</strong> En caracolas, galaxias, huracanes</li>
              <li><strong>Hexágonos:</strong> En panales de abejas</li>
              <li><strong>Fractales:</strong> En helechos, copos de nieve</li>
              <li><strong>Ondas:</strong> En agua, sonido, luz</li>
              <li><strong>Ramificaciones:</strong> En árboles, ríos, vasos sanguíneos</li>
            </ul>
            
            <h3>Secuencias Aritméticas</h3>
            <p>Secuencias donde agregamos el mismo número cada vez:</p>
            <ul>
              <li>5, 10, 15, 20, 25... (diferencia común: +5)</li>
              <li>Para encontrar el siguiente: último número + diferencia</li>
              <li>Para encontrar cualquier término: primer término + (posición - 1) × diferencia</li>
            </ul>
            
            <h3>Secuencias Geométricas</h3>
            <p>Secuencias donde multiplicamos por el mismo número cada vez:</p>
            <ul>
              <li>2, 6, 18, 54, 162... (razón común: ×3)</li>
              <li>Para encontrar el siguiente: último número × razón</li>
              <li>Crecen muy rápidamente</li>
            </ul>
            
            <h3>Usar Patrones para Resolver Problemas</h3>
            <p>Los patrones nos ayudan a:</p>
            <ul>
              <li>Predecir qué viene después</li>
              <li>Encontrar números faltantes en secuencias</li>
              <li>Hacer cálculos más rápidos</li>
              <li>Entender relaciones entre números</li>
              <li>Crear arte y diseños</li>
            </ul>
            
            <h3>Patrones en Música y Arte</h3>
            <p>Los patrones crean belleza:</p>
            <ul>
              <li>Ritmos musicales se basan en patrones</li>
              <li>Melodías siguen secuencias de notas</li>
              <li>Arte usa patrones para crear armonía visual</li>
              <li>Arquitectura usa patrones repetitivos</li>
              <li>Danza sigue patrones de movimiento</li>
            </ul>
            
            <p>Reconocer y crear patrones es una habilidad fundamental que nos ayuda a entender el orden y la belleza en las matemáticas y en el mundo.</p>
          `
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
          contenido: `
            <h2>¿Qué es la Probabilidad?</h2>
            <p>La probabilidad es la rama de las matemáticas que estudia la posibilidad de que ocurran eventos. Nos ayuda a entender el azar, hacer predicciones y tomar decisiones basadas en datos incompletos.</p>
            
            <h3>Conceptos Básicos de Probabilidad</h3>
            <p>Términos importantes que debemos conocer:</p>
            <ul>
              <li><strong>Evento:</strong> Algo que puede ocurrir (sacar cara en una moneda)</li>
              <li><strong>Resultado:</strong> Lo que realmente pasa</li>
              <li><strong>Evento seguro:</strong> Siempre ocurre (probabilidad = 1)</li>
              <li><strong>Evento imposible:</strong> Nunca ocurre (probabilidad = 0)</li>
              <li><strong>Eventos equiprobables:</strong> Tienen la misma posibilidad</li>
            </ul>
            
            <h3>Calculando Probabilidades</h3>
            <p>La probabilidad se calcula como:</p>
            <ul>
              <li>Probabilidad = Casos favorables ÷ Casos posibles</li>
              <li>Moneda: P(cara) = 1 ÷ 2 = 0.5 = 50%</li>
              <li>Dado: P(sacar 6) = 1 ÷ 6 = 0.167 ≈ 17%</li>
              <li>Se expresa como fracción, decimal o porcentaje</li>
            </ul>
            
            <h3>Experimentos Comunes</h3>
            <p>Ejemplos clásicos para entender probabilidad:</p>
            <ul>
              <li><strong>Lanzar moneda:</strong> 2 resultados (cara, cruz)</li>
              <li><strong>Tirar dado:</strong> 6 resultados (1, 2, 3, 4, 5, 6)</li>
              <li><strong>Sacar carta:</strong> 52 posibilidades en baraja completa</li>
              <li><strong>Ruleta:</strong> Depende del número de secciones</li>
              <li><strong>Lotería:</strong> Millones de combinaciones posibles</li>
            </ul>
            
            <h3>¿Qué es la Estadística?</h3>
            <p>La estadística es la ciencia de recoger, organizar y analizar datos:</p>
            <ul>
              <li>Nos ayuda a entender grupos grandes de información</li>
              <li>Encuentra patrones en los datos</li>
              <li>Hace predicciones sobre el futuro</li>
              <li>Ayuda a tomar decisiones informadas</li>
            </ul>
            
            <h3>Recolección de Datos</h3>
            <p>Los datos se pueden recoger de diferentes maneras:</p>
            <ul>
              <li><strong>Encuestas:</strong> Preguntar a las personas</li>
              <li><strong>Observación:</strong> Mirar y contar</li>
              <li><strong>Experimentos:</strong> Probar cosas controladamente</li>
              <li><strong>Registros:</strong> Usar información ya existente</li>
            </ul>
            
            <h3>Organizando Datos</h3>
            <p>Los datos se pueden mostrar visualmente:</p>
            <ul>
              <li><strong>Gráfico de barras:</strong> Para comparar cantidades</li>
              <li><strong>Gráfico circular:</strong> Para mostrar partes de un total</li>
              <li><strong>Histograma:</strong> Para mostrar frecuencias</li>
              <li><strong>Tabla:</strong> Para organizar información</li>
            </ul>
            
            <h3>Medidas de Tendencia Central</h3>
            <p>Formas de describir un conjunto de datos:</p>
            <ul>
              <li><strong>Media (promedio):</strong> Suma todos y divide por la cantidad</li>
              <li><strong>Mediana:</strong> El valor del medio cuando se ordenan</li>
              <li><strong>Moda:</strong> El valor que aparece más veces</li>
              <li>Ejemplo: 2, 3, 3, 5, 7 → Media=4, Mediana=3, Moda=3</li>
            </ul>
            
            <h3>Probabilidad en la Vida Real</h3>
            <p>Usamos probabilidad constantemente:</p>
            <ul>
              <li>Predicción del clima</li>
              <li>Juegos y deportes</li>
              <li>Medicina (probabilidad de recuperación)</li>
              <li>Seguros (calcular riesgos)</li>
              <li>Mercado de valores</li>
              <li>Planificación de transporte</li>
            </ul>
            
            <h3>Estadísticas en los Medios</h3>
            <p>Es importante saber interpretar estadísticas:</p>
            <ul>
              <li>Encuestas políticas</li>
              <li>Estadísticas deportivas</li>
              <li>Datos de salud</li>
              <li>Información económica</li>
              <li>Estudios científicos</li>
            </ul>
            
            <p>La probabilidad y estadística nos dan herramientas para entender la incertidumbre y tomar decisiones más inteligentes basadas en evidencia.</p>
          `
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


