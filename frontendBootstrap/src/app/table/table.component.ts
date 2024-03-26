import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Vokabel } from '../shared/vokabel';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  ngOnInit(): void {
    this.readAll();
  }
  bs = inject(BackendService)
  vokabeln: Vokabel[] = [];

  readAll(): void {
  this.bs.getAllVokabeln().subscribe(
        {
          next: (response) => {
                this.vokabeln = response;
                console.log(this.vokabeln);
                return this.vokabeln;
              },
          error: (err) => console.log(err),
          complete: () => console.log('getAllVokabeln() completed')
        })
  }

  delete(id: string): void {
    console.log('id', id)
    this.bs.deleteOneVokabel(id).subscribe(
        {
          next: (response) => {
                console.log(response);
                this.readAll();
              },
          error: (err) => console.log(err),
          complete: () => console.log('deleting completed')
        })
  }
}