import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { BackendService } from '../shared/backend.service';
import { Vokabeln } from '../shared/vokabeln';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class TableComponent implements OnInit { //Ereignis, welches initialisierung der Componente ausgeführt wird und ruft OnInit auf
  bs = inject(BackendService) //oder so: constructor(private bs: BackendService){}
  vokabeln: Vokabeln[] = [];
  constructor(){}

  ngOnInit(): void {
    this.readAllVokabeln();  //rufen die Funktion readAllVokabeln auf
  }

  readAllVokabeln(){
    this.bs.getAllVokabeln().subscribe({ //ruft die Funktion aus backendservice auf
      next: (response) => {
          this.vokabeln = response;  //greifen auf backend zu und speiches diese in der vokabeln-Array
          console.log('vokabeln', this.vokabeln);
          return this.vokabeln;
      },
      error: (err) => console.log('error',err),
      complete: () => console.log('getAllVokabeln completed')
    })
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

}
