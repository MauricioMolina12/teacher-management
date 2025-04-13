import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-confirm',
  standalone: false,
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent implements OnInit {
  @Input() title!: string;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmitSuccess = new EventEmitter<boolean>();
  form!: FormGroup;
  isSubmitting: boolean = false;

  constructor() {
  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      confirm: new FormControl(null)
    });
  }
  
  submitForm(): void {    
    this.isSubmitting = true
    this.onSubmitSuccess.emit();
  }

  closeModal(): void {
    this.onSubmitSuccess.emit();
    this.onClose.emit();
  }
}
