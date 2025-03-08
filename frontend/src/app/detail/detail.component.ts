import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Vocab } from '../shared/vocab';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private bs = inject(BackendService)
  private route = inject(ActivatedRoute)
  vocab!: Vocab;
  id: string | null = ''
  form = new FormGroup({
    koreanControll: new FormControl<string>(''),
    pronunciationControll: new FormControl<string>(''),
    englishControll: new FormControl<string>(''),
    exampleControll: new FormControl<string>(''),
    meaningControll: new FormControl<string>(''),
    difficultyControll: new FormControl<number | null>(null)
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)

    this.bs.getOneVocab(Number(this.id)) // `id` ist ein String, muss in eine Zahl umgewandelt werden
      .subscribe(response => {
        this.vocab = response;
        console.log('vocab = ', this.vocab);

        this.form.patchValue({
          koreanControll: this.vocab.korean,
          pronunciationControll: this.vocab.pronunciation,
          englishControll: this.vocab.english,
          exampleControll: this.vocab.example,
          meaningControll: this.vocab.meaning,
          difficultyControll: this.vocab.difficulty

        });
      },
        error => console.error('Error in DetailComponent: ', error)
    )
      
  }
  //export class DetailComponent implements OnInit {
  //  private bs = inject(BackendService);
  //  private route = inject(ActivatedRoute);
  //  vocab!: Vocab;
  //  id: string | null = ''
  //  form = new FormGroup({
  //    koreanControll : new FormControl<string>(''),
  //    pronunciationControll : new FormControl<string>(''),
  //    englishControll : new FormControl<string>(''),
  //    exampleControll: new FormControl<string>(''),
  //    meaningControll: new FormControl<string>(''),
  //    difficultyControll: new FormControl<number | null>(null)
  //  });

  //  ngOnInit(): void {
  //    this.id = this.route.snapshot.paramMap.get('id');
  //    console.log('id = ', this.id);
  //    this.bs.getOneVocab(Number(this.id!))
  //    .then( response => { 
  //      this.vocab = response;
  //      this.form.patchValue({
  //        koreanControll: this.vocab.korean,
  //        pronunciationControll: this.vocab?.pronunciation,
  //        englishControll: this.vocab?.english,
  //        exampleControll: this.vocab?.example,
  //        meaningControll: this.vocab?.meaning,
  //        difficultyControll: this.vocab?.difficulty
  //      });
  //      return this.vocab;
  //    })
  //    .then (vocab => console.log('vocab in DetailComponent : ', vocab))
  //  }

    update() {
      // Update-Logik implementieren
    }

    cancel() {
      // Abbrechen-Logik implementieren
    }
  
}
