import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Vocab } from '../../shared/vocab';

@Component({
  selector: 'app-vocab',
  imports: [],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.css'
})
export class VocabComponent implements OnInit { // OnInit ein Interface; beim Initialisieren des Komponenten aufgerufen wird
  bs = inject(BackendService)
  // constructor(private bs: BackendService) { } --würde auch gehen
  vocabList: Vocab[] = []

  constructor() {
    this.readAllVocabs()
  }
  ngOnInit(): void {
    this.readAllVocabs()
  }

  readAllVocabs() { // Subscribtion-Obj hat 3 Eigenschaften: next (gibt den Wert), error, complete
    this.bs.getAllVocabs().subscribe({ // melden an und subscriben auf den Observable aus shared/Backend.service.ts
      next: (response) => { // es wird ein response erwartet
        this.vocabList = response; // speichert in die Liste
        console.log('vocabls', this.vocabList); // EXTRA: gibt die Liste auf console aus
        return this.vocabList; 
      },
      error: (error) => console.log('Error:', error),
      complete: () => { console.log('getAllVocabs() completed') }
    })
  }
}


// Was passiert hier?
// - Komponente VocabComponent wird initialisiert, dabei ng ngOnInit() wird ausgeführt
// - in ngOnInit() wird readAllVocabs() aufgerufen
// - die ruft die Funktion aus Backend.service.ts auf
// - die Funktion macht eine HTTP-GET-Request an die URL des Backends (bzw. DB)
// - die response von Backend wird in die Liste vocabList (array) gespeichert 
// - Extra: die Liste wird auf der Konsole ausgegeben