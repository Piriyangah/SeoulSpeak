import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { BackendService } from '../shared/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule],
})

export class FormComponent {
  //anbindung mit BackendService
  private bs = inject(BackendService);
  router = inject(Router);


  germanFC = new FormControl('', [Validators.required]);
  koreanFC = new FormControl('', [Validators.required]);
  pronunciationFC = new FormControl('');
  eg_germanFC = new FormControl('');
  eg_koreanFC = new FormControl('');
  eg_pronunciationFC = new FormControl('');
  SchwierigkeitsgradFC = new FormControl('');

  //Wenn die Pflichtfelder nicht befüllt sind, dann
  getErrorMessageGerman(){
    if(this.germanFC.hasError('required')) return 'Bitte ausfüllen';
    else return '';
  }

  getErrorMessageKorean(){
    if(this.koreanFC.hasError('required')) return 'Bitte ausfüllen';
    else return '';
  }

  formInvalid(){
    return this.germanFC.invalid || this.koreanFC.invalid;
  }

  register(){
    if(!this.formInvalid){
      let vokabel = {
        german: this.germanFC.value!,
        korean: this.koreanFC.value!,
        pronunciation: this.pronunciationFC.value!,
        eg_german: this.eg_germanFC.value!,
        eg_korean: this.eg_koreanFC.value!,
        eg_pronunciation: this.eg_pronunciationFC.value!,
        Schwierigkeitsgrad: this.SchwierigkeitsgradFC.value!
      }
      //anbindung mit BackendService
      this.bs.createNewVokabel(vokabel).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/table'])
        },
        error: (err) => console.log(err),
        complete: () => console.log('vokabel created')
      })

      
      console.log('vokabel', vokabel)
    }
    else{
      console.log('from invalid')
    }
  }
}
