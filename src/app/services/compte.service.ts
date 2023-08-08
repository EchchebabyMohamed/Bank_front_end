import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detailsDeCompte } from '../modele/Compte.modele';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  host = "http://localhost:8085";
  constructor(private http: HttpClient) { }

  public getCompte(id: String, page: number, size: number): Observable<detailsDeCompte> {
    return this.http.get<detailsDeCompte>(this.host + '/comptes/' + id + '/pageoperations?page=' + page + '&size=' + size);
  }
  public versemant(id: String, montant: number, description: String) {
    let data = { compteId: id, montant: montant, description: description }
    return this.http.post(this.host + '/comptes/versement', data);
  }
  public retrait(id: String, montant: number, description: String) {
    let data = { compteId: id, montant: montant, description: description }
    return this.http.post(this.host + '/comptes/retrait', data);
  }
  public virsement(idSource: String, idDestination: string, montant: number) {
    let data = { compteIdSource: idSource, compteIdDestination: idDestination, montant: montant }
    return this.http.post(this.host + '/comptes/virement', data);
  }
}
