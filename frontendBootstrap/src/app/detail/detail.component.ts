import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vokabel } from '../shared/vokabel';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  id: string = '';
  vokabel!: Vokabel;
  closeResult = '';

  germanFC = new FormControl('', [Validators.required]);
  koreanFC = new FormControl('', [Validators.required]);
  pronunciationFC = new FormControl('');
  eg_germanFC = new FormControl('');
  eg_koreanFC = new FormControl('');
  eg_pronunciationFC = new FormControl('');
  SchwierigkeitsgradFC = new FormControl('');
  
  private modalService = inject(NgbModal);
  private bs = inject(BackendService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.bs.getOneVokabel(id).subscribe(
    {
      next: (response: Vokabel) => {
              this.vokabel = response;
              console.log(this.vokabel);
              this.germanFC.setValue(this.vokabel.german);
              this.koreanFC.setValue(this.vokabel.korean);
              this.pronunciationFC.setValue(this.vokabel.pronunciation);
              this.eg_germanFC.setValue(this.vokabel.eg_german);
              this.eg_koreanFC.setValue(this.vokabel.eg_korean);
              this.eg_pronunciationFC.setValue(this.vokabel.eg_pronunciation);
              return this.vokabel;
      },
      error: (err) => console.log(err),
      complete: () => console.log('getOne() completed')
    });
  }

  private formValid() {
    return this.germanFC.valid && this.koreanFC.valid;
  }

  create(content: TemplateRef<any>) {

    if(this.formValid())
    {
      let vokabel = 
      {
        id:'',
        german: this.germanFC.value!,
        korean: this.koreanFC.value!,
        pronunciation: this.pronunciationFC.value!,
        eg_german: this.eg_germanFC.value!,
        eg_korean: this.eg_koreanFC.value!,
        eg_pronunciation: this.eg_pronunciationFC.value!
      }

      this.bs.updateOneVokabel(vokabel, this.id).subscribe({
          next: (response) => console.log('response', response),
          error: (err) => console.log(err),
          complete: () => console.log('update completed')
      });

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' }).result
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