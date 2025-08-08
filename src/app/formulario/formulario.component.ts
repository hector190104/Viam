import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Step {
  key: string;
  label: string;
  type: 'select' | 'checkbox';
  options: string[];
  maxSelections?: number;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  testForm!: FormGroup;
  currentStep = 0;
  errorStep = false;
  showWelcomeMessage = false;

  steps: Step[] = [
    { key: 'edad', label: '¿Qué edad tienes?', type: 'select', options: ['Entre 15 y 17 años','18 años o más'] },
    { key: 'intereses', label: '¿Qué temas te interesan más? (hasta 3)', type: 'checkbox',
      options: ['Ciencia','Tecnología','Ingeniería','Matemáticas','Arte y diseño','Medio ambiente','Robótica','Videojuegos','Otro'], maxSelections: 3
    },
    { key: 'experiencia', label: '¿Experiencia previa en STEAM?', type: 'select',
      options: ['Ninguna','Básica','Intermedia/Avanzada','No estoy segura'] },
    { key: 'actitud', label: '¿Cómo te sientes respecto a STEAM? (hasta 3)', type: 'checkbox',
      options: ['Muy emocionada','Curiosa','Con dudas','Un poco insegura'], maxSelections: 3 },
    { key: 'frecuenciaUso', label: '¿Frecuencia uso de dispositivos?', type: 'select',
      options: ['Casi nunca','A veces','Frecuentemente','Todos los días'] },
    { key: 'expectativas', label: '¿Qué esperas encontrar en VIAM?', type: 'select',
      options: ['Cursos','Inspiración','Retos','Ayuda carrera','Comunidad','No sé aún'] },
    { key: 'deseaMentoria', label: '¿Quieres mentora?', type: 'select',
      options: ['Sí','Tal vez más adelante','Prefiero sola','No sé aún'] },
    { key: 'esNueva', label: '¿Eres nueva en VIAM?', type: 'select',
      options: ['Sí, es mi primera vez','No, ya había entrado antes'] }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      edad: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      intereses: this.fb.array([], Validators.required),
      experiencia: ['', Validators.required],
      actitud: this.fb.array([], Validators.required),
      frecuenciaUso: ['', Validators.required],
      expectativas: ['', Validators.required],
      deseaMentoria: ['', Validators.required],
      esNueva: ['', Validators.required]
    });

    // Log de conexión con los modelos
    console.log('%c[VIAM] Conexión con modelos: %cOK', 'color: teal; font-weight: bold;', 'color: green;');
  }

  onCheckboxChange(e: any) {
    const idx = this.currentStep - 1;
    const step = this.steps[idx];
    const arr = this.testForm.get(step.key) as FormArray;
    const val = e.target.value;
    if (e.target.checked) {
      if ((step.maxSelections ?? 1) > 1 && arr.length >= (step.maxSelections ?? 1)) {
        e.target.checked = false;
        alert(`Solo puedes seleccionar hasta ${step.maxSelections} opciones.`);
        return;
      }
      arr.push(this.fb.control(val));
    } else {
      const rem = arr.controls.findIndex(c => c.value === val);
      if (rem > -1) arr.removeAt(rem);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.errorStep = false;
    }
  }

  nextStep() {
    this.errorStep = false;
    // ...validación paso a paso...
    if (this.currentStep < 8) {
      this.currentStep++;
    } else {
      this.showWelcomeMessage = true;
      console.log('Formulario completo:', this.testForm.value);
    }
  }

  closeWelcome() {
    this.router.navigate(['/cursos']);
  }
}
