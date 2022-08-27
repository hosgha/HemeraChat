import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactInfo } from '../_models/contact-info.model';
import { environment } from './../environments/environment';
const API_URL = environment.apiUrl + 'contact/';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get<ContactInfo[]>(API_URL, { responseType: 'json' });
  }
}
