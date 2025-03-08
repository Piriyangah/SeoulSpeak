import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute } from '@angular/router';
import { Vocab } from '../shared/vocab';


@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  private bs = inject(BackendService)
  private route = inject(ActivatedRoute)
  vocab!: Vocab;
  id: string | null = ''

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)

    this.bs.getOneVocab(Number(this.id)) // `id` ist ein String, muss in eine Zahl umgewandelt werden
      .subscribe(response => {
        this.vocab = response;
        console.log('vocab = ', this.vocab);
      });
  }
}
