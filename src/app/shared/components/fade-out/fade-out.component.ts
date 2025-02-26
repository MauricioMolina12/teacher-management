import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fade-out',
  standalone: false,
  templateUrl: './fade-out.component.html',
  styleUrl: './fade-out.component.scss',
})
export class FadeOutComponent implements OnInit {

  @Input() animationCompleted: boolean = false;
  constructor(private router: Router){}

  ngOnInit(): void {

  }
}
