import { Component, inject, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Vocab } from '../../shared/vocab';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vocab',
  imports: [CommonModule, RouterLink],
  templateUrl: './vocab.component.html',
  styleUrl: './vocab.component.css'
})
export class VocabComponent implements OnInit { // OnInit ein Interface; beim Initialisieren des Komponenten aufgerufen wird
  bs = inject(BackendService)
  vocabList: Vocab[] = []
  vocab!: Vocab;
  deleteVocab: Vocab | null = null;
  deleteStatus = false;

  constructor(private router: Router) {
    this.readAllVocabs()
  }
  ngOnInit(): void {
    this.readAllVocabs()
  }

  readAllVocabs() { // Subscribtion-Obj hat 3 Eigenschaften: next (gibt den Wert), error, complete
    this.bs.getAllVocabs().subscribe({ // melden an und subscriben auf den Observable aus shared/Backend.service.ts
      next: (response) => { // es wird ein response erwartet
        console.log("Fetched vocabs:", response); // Debugging
        this.vocabList = response; // speichert in die Liste
        console.log('vocabls', this.vocabList); // EXTRA: gibt die Liste auf console aus
        return this.vocabList; 
      },
      error: (error) => console.log('Error:', error),
      complete: () => { console.log('getAllVocabs() completed') }
    })
  }

  //delete(id: number): void {
  //  this.bs.deleteVocab(id).subscribe({
  //    next: () => {
  //      // Entferne die gelöschte Vokabel aus der Liste
  //      this.vocabList = this.vocabList.filter(vocab => vocab.id !== id);
  //      console.log(`Vocabulary with id=${id} deleted`);
  //    },
  //    error: (error) => console.log('Error deleting vocabulary:', error),
  //    complete: () => console.log('deleteVocab() completed')
  //  });
  //}

  delete(id: number) {
    const vocabToDelete = this.vocabList.find(v => v.id === id);
    if (vocabToDelete) {
      this.deleteVocab = vocabToDelete;
      this.deleteStatus = true;
    }
  }

  openDeleteModal(vocab: Vocab) {
    this.deleteVocab = vocab;
    this.deleteStatus = true;
  }

  /*delete(id: number): void{
    console.log('Deleting vocab with ID:', this.vocab.id);
    this.bs.deleteVocab(Number(this.deleteId)).subscribe({
      next: ( response: any) => {
        console.log('response:', response);
          if(response.status == 204){
            console.log(response.status);
            this.reload(true);
          } else {
            console.log(response.status);
            console.log(response.error);
            this.reload(false);
          }
      }, 
      error: (error) => console.log('Error deleting vocabulary:', error),
      complete: () => console.log('deleteVocab() completed')
    });
  }
  */
  reload(deleted: boolean)
  {
    this.deleteStatus = deleted;
    this.readAllVocabs();
    this.router.navigate(['./vocab']);
  }

  confirm() {
    if (this.deleteVocab) {
      this.bs.deleteVocab(this.deleteVocab.id).subscribe({
        next: () => {
          this.vocabList = this.vocabList.filter(v => v.id !== this.deleteVocab?.id);
          this.deleteStatus = false;
          this.deleteVocab = null;
        },
        error: (error) => console.log('Error deleting vocabulary:', error),
        complete: () => console.log('deleteVocab() completed')
      });
    }
  }

  cancel() {
    this.deleteStatus=false
    this.deleteVocab = null;;
  }
}
// Was passiert hier?
// - Komponente VocabComponent wird initialisiert, dabei ng ngOnInit() wird ausgeführt
// - in ngOnInit() wird readAllVocabs() aufgerufen
// - die ruft die Funktion aus Backend.service.ts auf
// - die Funktion macht eine HTTP-GET-Request an die URL des Backends (bzw. DB)
// - die response von Backend wird in die Liste vocabList (array) gespeichert 
// - Extra: die Liste wird auf der Konsole ausgegeben
