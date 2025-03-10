import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Router } from '@angular/router';
import { Vocab } from '../shared/vocab';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private bs = inject(BackendService)
  private router = inject(Router)
  vocab: Vocab = {id: 0, korean: '', pronunciation: '', english: '', example: '', meaning: '', difficulty: 0}
  saved: boolean = false

  form = new FormGroup({
    koreanControl: new FormControl<string>(''),
    pronunciationControl: new FormControl<string>(''),
    englishControl: new FormControl<string>(''),
    exampleControl: new FormControl<string>(''),
    meaningControl: new FormControl<string>(''),
    difficultyControl: new FormControl<number | null>(null)
  });

  createVocab() : void{
    const values = this.form.value
    console.log('values = ', values)
    this.vocab.korean = values.koreanControl
    this.vocab.pronunciation = values.pronunciationControl
    this.vocab.english = values.englishControl
    this.vocab.example = values.exampleControl
    this.vocab.meaning = values.meaningControl
    this.vocab.difficulty = values.difficultyControl
    console.log('new vocab = ', this.vocab)

    if(this.vocab.korean!='' && this.vocab.english!=''){
      this.bs.createVocab(this.vocab).subscribe({
        next: (response) => {
          console.log('response = ', response)
          this.saved = true
          this.router.navigate(['/vocabulary'])
        },
        error: (error) => console.error('Error creating vocab: ', error),
        complete: () => console.log('createVocab() completed')
      })
    }

}
