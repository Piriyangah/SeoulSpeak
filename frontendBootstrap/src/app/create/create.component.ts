import { Component, TemplateRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../shared/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  private modalService = inject(NgbModal);
  private bs = inject(BackendService);
  private router = inject(Router);
  closeResult = '';

  germanFC = new FormControl('', [Validators.required]);
  koreanFC = new FormControl('', [Validators.required]);
  pronunciationFC = new FormControl('');
  eg_germanFC = new FormControl('');
  eg_koreanFC = new FormControl('');
  eg_pronunciationFC = new FormControl('');
  SchwierigkeitsgradFC = new FormControl('');
  
  private formValid() {
    return this.germanFC.valid && this.koreanFC.valid;
  }

  create(content: TemplateRef<any>) {

    if(this.formValid())
    {
      let vokabel = {
        id: '',
        german: this.germanFC.value!,
        korean: this.koreanFC.value!,
        pronunciation: this.pronunciationFC.value!,
        eg_german: this.germanFC.value!,
        eg_korean: this.koreanFC.value!,
        eg_pronunciation: this.pronunciationFC.value!
      }

      this.bs.createNewVokabel(vokabel).subscribe({
          next: (response) => console.log('response', response),
          error: (err) => console.log(err),
          complete: () => console.log('vokabel erstellt')
      });

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.router.navigate(['/vokabeln']);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );

      console.log('new vokabel: ', vokabel)
    }
    else
    {
      console.warn('form still invalid!')
    }
  }

  cancel() {
    this.germanFC.reset();
    this.koreanFC.reset();
    this.pronunciationFC.reset();
    this.eg_germanFC.reset();
    this.eg_koreanFC.reset();
    this.eg_pronunciationFC.reset();
  }

  private getDismissReason(reason: any): string {
  switch (reason) {
    case ModalDismissReasons.ESC:
      return 'by pressing ESC';
    case ModalDismissReasons.BACKDROP_CLICK:
      return 'by clicking on a backdrop';
    default:
      return `with: ${reason}`;
  }
}
}