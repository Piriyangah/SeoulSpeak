import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vokabel } from './vokabel';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:4000/vocabulary';

  constructor(private http: HttpClient) { }

  getAllVokabeln(): Observable<Vokabel[]> {
    let endpoint = '/vokabeln';
    return this.http.get<Vokabel[]>(this.backendUrl + endpoint);
  }

  deleteOneVokabel(id: string): Observable<any> {
    let endpoint = '/vokabeln';
    return this.http.delete<any>(this.backendUrl + endpoint + "/" + id);
  }

  getOneVokabel(id: string): Observable<Vokabel>{
    let endpoint = '/vokabeln';
    return this.http.get<Vokabel>(this.backendUrl + endpoint + '/' + id);
  }

  createNewVokabel(vokabel: Vokabel): Observable<Vokabel> {
    let endpoint = '/vokabeln';
    return this.http.post<Vokabel>(this.backendUrl + endpoint, vokabel);
  }

  updateOneVokabel(vokabel: Vokabel, id: string): Observable<Vokabel> {
    let endpoint = '/vokabeln';
    return this.http.put<Vokabel>(this.backendUrl + endpoint + "/" + id, vokabel);
  }
}