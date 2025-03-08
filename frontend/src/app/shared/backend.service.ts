import { HttpClient } from '@angular/common/http'; // stellt die Funktionen zu verfügung, um HTTP-Anfragen zu senden und zu empfangen
import { Injectable } from '@angular/core';
import { Vocab } from './vocab';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { } 

  // Observable, das eine Liste von Vokabeln zurückgibt... (wie Promise, aber anders)
  getAllVocabs(): Observable<Vocab[]> {
    return this.http.get<Vocab[]>(this.backendUrl + "/vocabulary"); 
  }

  getOneVocab(id: number): Observable<Vocab> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.get<Vocab>(url);
  }

  updateVocab(id: number, vocab: Vocab): Observable<Vocab> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.put<Vocab>(url, vocab);
  }  

  async getOneVocab2(id: number): Promise<Vocab> {
    let response = await fetch(`${this.backendUrl}/vocabulary/${id}`);
    let vocab = await response.json();
    console.log('vocab in service (getOneVocab) : ', vocab);
    return vocab;
  }

  deleteVocab(id: number): Observable<void> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.delete<void>(url);
  }
}