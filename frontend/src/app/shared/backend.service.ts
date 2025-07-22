import { HttpClient } from '@angular/common/http'; // stellt die Funktionen zu verfügung, um HTTP-Anfragen zu senden und zu empfangen
import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Vocab } from './vocab';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = environment.apiUrl;  // binden wir die environment.ts in unseren Service ein = apiUrl
  //backendUrl = 'http://localhost:3000'; 

  // Login und Registrierung
  user: WritableSignal<User> = signal({id: 0, username: '', password: '', email: '', role: ''});
  token: WritableSignal<string> = signal('');
  loggedIn: Signal<boolean> = computed(() => this.user().id && this.user().id! > 0 || false);
  isAdmin: Signal<boolean> = computed(() => this.user().role == 'admin' || false);

  constructor(private http: HttpClient) { }

  setUser(token: string, user: User): void {
    this.user.set(user);
    this.token.set(token);
  }

  unsetUser(): void {
    this.user.set({id: 0, username: '', password: '', email: '', role: ''});
    this.token.set('');
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.backendUrl + '/user/register', user);
  }

  loginUser(user: { username: string; password: string; }): Observable<any> {
    return this.http.post(this.backendUrl + '/user/login', user);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.backendUrl}/user/logout`, {});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl + '/allUsers', {
      headers: {
        'authorization': this.token(),
        'username': this.user().username
      }
    });
  }

  // Observable, das eine Liste von Vokabeln zurückgibt... (wie Promise, aber anders)
  getAllVocabs(): Observable<Vocab[]> {
    return this.http.get<Vocab[]>(this.backendUrl + "/vocabulary"); 
  }

  getOneVocab(id: number): Observable<Vocab> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.get<Vocab>(url);
  }

  createVocab(vocab: Vocab): Observable<Vocab> {
    return this.http.post<Vocab>(this.backendUrl + "/vocabulary", vocab);
  }

  updateVocab(id: number, vocab: Vocab): Observable<Vocab> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.put<Vocab>(url, vocab);
  }  

  //async getOneVocab2(id: number): Promise<Vocab> {
  //  let response = await fetch(`${this.backendUrl}/vocabulary/${id}`);
  //  let vocab = await response.json();
  //  console.log('vocab in service (getOneVocab) : ', vocab);
  //  return vocab;
  //}

  deleteVocab(id: number): Observable<void> {
    const url = `${this.backendUrl}/vocabulary/${id}`;
    return this.http.delete<void>(url);
  }

  currentUser(): User {
    return this.user();
  }
}