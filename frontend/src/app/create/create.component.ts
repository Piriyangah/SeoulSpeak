import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Router } from '@angular/router';
import { Vocab } from '../shared/vocab';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private bs = inject(BackendService)
  private router = inject(Router)
  vocab: Vocab = {id: 0, korean: '', pronunciation: '', english: '', example: '', meaning: '', difficulty: 0}
  saved: boolean = false

  modalValues: any = {}; // für Modal-Dialog

  form = new FormGroup({
    koreanControl: new FormControl<string>('',[Validators.required]),
    pronunciationControl: new FormControl<string>(''),
    englishControl: new FormControl<string>('',[Validators.required]),
    exampleControl: new FormControl<string>(''),
    meaningControl: new FormControl<string>(''),
    difficultyControl: new FormControl<number | null>(null)
  });

  createVocab() : void {
    console.log(this.form);
    console.log('Form Status:', this.form.status);
    console.log('Form Errors:', this.form.errors);
    console.log('Form Controls:', this.form.controls);

    if (this.form.invalid) {
      console.log('Form is invalid');
      return; 
    }

    const values = this.form.value;
      console.log('values = ', values);

      this.vocab.korean = values.koreanControl || '';
      this.vocab.pronunciation = values.pronunciationControl || '';
      this.vocab.english = values.englishControl || '';
      this.vocab.example = values.exampleControl || '';
      this.vocab.meaning = values.meaningControl || '';
      this.vocab.difficulty = values.difficultyControl || 0;
      
      console.log('new vocab = ', this.vocab);

      if (this.vocab.korean != '' && this.vocab.english != '') {
        this.bs.createVocab(this.vocab)
          .subscribe(() => {
            this.saved = true;
            this.router.navigate(['./vocab']);
          });
      
    }
  }

  confirm() : void{
    this.modalValues = {
      korean: this.form.value.koreanControl || '',
      pronunciation: this.form.value.pronunciationControl || '',
      english: this.form.value.englishControl || '',
      example: this.form.value.exampleControl || '',
      meaning: this.form.value.meaningControl || '',
      difficulty: this.form.value.difficultyControl || ''
    };
    
    // Show Modal
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
    modal.show();

    // Set the confirm callback to createVocab
    const confirmButton = document.getElementById('confirmButton')!;
    confirmButton.addEventListener('click', () => {
      this.createVocab(); 
      modal.hide(); 
    });
  }

  cancel() : void{
    this.router.navigate(['./vocab'])
  }

}
