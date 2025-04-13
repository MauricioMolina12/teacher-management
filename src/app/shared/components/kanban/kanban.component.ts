import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban',
  standalone: false,
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit {
  ngOnInit(): void {}

  todo = [
    {
      title: 'Realizar investigaciones',
      description:
        'Realizar investigaciones en base a los temas acordados en la reunión',
      date: '2 noviembre 2025',
    },
    {
      title: 'Lectura de artículos académicos',
      description:
        'Leer y analizar artículos relacionados con el tema de la investigación',
      date: '3 noviembre 2025',
    },
    {
      title: 'Preparar resumen de investigaciones',
      description:
        'Escribir un resumen con los puntos clave de las investigaciones realizadas',
      date: '4 noviembre 2025',
    },
    {
      title: 'Buscar referencias bibliográficas',
      description:
        'Consultar libros y papers para fundamentar el trabajo final',
      date: '5 noviembre 2025',
    },
    {
      title: 'Diseñar la metodología de investigación',
      description:
        'Definir el enfoque metodológico y técnicas a utilizar en el estudio',
      date: '6 noviembre 2025',
    },
  ];

  inProgress = [
    {
      title: 'Elaboración del marco teórico',
      description:
        'Desarrollar el apartado teórico del trabajo de investigación',
      date: '7 noviembre 2025',
    },
    {
      title: 'Revisión y corrección del borrador',
      description: 'Revisar errores y mejorar la estructura del documento',
      date: '8 noviembre 2025',
    },
    {
      title: 'Preparación de la presentación',
      description: 'Crear diapositivas para la exposición del trabajo',
      date: '9 noviembre 2025',
    },
  ];

  done = [
    { title: 'Definición del tema de investigación', description: 'Elegir y delimitar el tema a investigar', date: '30 octubre 2025' },
    { title: 'Revisión de requisitos del proyecto', description: 'Verificar los lineamientos y objetivos establecidos por el profesor', date: '31 octubre 2025' },
    { title: 'Asignación de roles en el equipo', description: 'Distribuir tareas entre los integrantes del equipo de trabajo', date: '1 noviembre 2025' }
  ];
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Si se mueve dentro de la misma lista, reordenamos los elementos
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Si el elemento se mueve a otra lista, lo transferimos al nuevo array
      transferArrayItem(
        event.previousContainer.data, // Lista de origen
        event.container.data, // Lista de destino
        event.previousIndex, // Índice del elemento en la lista de origen
        event.currentIndex // Índice donde se insertará en la nueva lista
      );

      console.log(event.container.data);
    }
  }
}
