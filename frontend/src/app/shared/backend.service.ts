import { HttpClient } from '@angular/common/http'; // stellt die Funktionen zu verfügung, um HTTP-Anfragen zu senden und zu empfangen
import { Injectable } from '@angular/core';
import { Vocab } from './vocab';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:3000'; // URL des Backends

  constructor(private http: HttpClient) { } 

  // Observable, das eine Liste von Vokabeln zurückgibt... (wie Promise, aber anders)
  getAllVocabs(): Observable<Vocab[]> {
    return this.http.get<Vocab[]>(this.backendUrl + "/vocabulary"); 
  }

  getOneVocab(id: number): Observable<Vocab> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.get<Vocab>(url);
  }

  deleteVocab(id: number): Observable<void> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.delete<void>(url);
  }
}