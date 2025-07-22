import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})

export class ConfirmComponent {
  @Input() headline = 'Bestätigung';
  @Input() info = 'Sind Sie sicher?';
  @Input() show = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
