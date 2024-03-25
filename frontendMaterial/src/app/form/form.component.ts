import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {

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
      let german = {
        german: this.germanFC.value,
        korean: this.koreanFC.value
      }
      console.log('german', german)
    }
    else{
      console.log('from invalid')
    }
  }
}
