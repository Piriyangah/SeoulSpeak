import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vokabeln } from './vokabeln';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:4000'

  constructor(private http: HttpClient) //HttpClient stellt alle Funktionen wir Post, Delete usw zu Verfügung
  { }


  //GET - mit table.component.ts
  getAllVokabeln(): Observable<Vokabeln[]>{ //mit ng g i shared/vokabeln interface für vokabeln erstellen
    let endpoint = '/vokabeln';
    return this.http.get<Vokabeln[]>(this.backendUrl + endpoint); // in shared/vokabeln definiert, gibt eine Vokabel-Array zurück
  }

  //GET - mit table.component.ts
  deleteOneVokabel(id: string): Observable<any> {
    let endpoint = '/vokabeln';
    return this.http.delete<any>(this.backendUrl + endpoint + "/" + id);
  }

  //POST - mit form.component.ts
  createNewVokabel(vokabel: Vokabeln): Observable<Vokabeln> {
    let endpoint = '/vokabeln';
    return this.http.post<Vokabeln>(this.backendUrl + endpoint, vokabel);
  }



}

