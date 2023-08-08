import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from '../modele/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  host: String = "http://localhost:8085";
  constructor(private http: HttpClient) { }
  public getCleients(): Observable<Array<Clients>> {
    return this.http.get<Array<Clients>>(this.host + '/clients');
  }
  public getCleientsRecherche(kw: String): Observable<Array<Clients>> {
    return this.http.get<Array<Clients>>(this.host + '/clients/recherche?kwd=' + kw);
  }
  public ajouterCleients(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.host + '/clients?',client);
  }
  public supprimerCleients(clientid: number){
    return this.http.delete(this.host + '/clients/'+clientid);
  }

}
