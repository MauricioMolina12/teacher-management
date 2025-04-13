import { Component } from '@angular/core';

@Component({
  selector: 'app-subjects',
  standalone: false,
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {

  facultades = [
    'Ingeniería',
    'Derecho',
    'Salud',
    'Ciencias sociales',
    'Economía',
    'Artes',
    'Deportes'
  ]

  actionItemList(item: any){    
    console.log(item);        
  }

}
