import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: false,
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent implements OnInit {
  @Input({ required: true }) user: any;
  @Input() theFirtsWord: string = '';

  async ngOnInit() {
;
  }
}
