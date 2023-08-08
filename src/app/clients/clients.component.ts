import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Clients } from '../modele/clients';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients!: Observable<Array<Clients>>
  errormessage!: String
  formGroupCherche: FormGroup | undefined
  constructor(private cl: ClientsService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formGroupCherche = this.fb.group({
      kwd: this.fb.control('')
    });
    this.chercherClient()
  }
  chercherClient() {
    let kw = this.formGroupCherche?.value.kwd;
    this.clients = this.cl.getCleientsRecherche(kw).pipe(
      catchError(err => {
        this.errormessage = err.message;
        return throwError(err);
      })
    );
  }
  supprimerClient(cli: Clients) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Vous voulez supprimer ce client",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer le!',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cl.supprimerCleients(cli.id).subscribe(
          {
            next: res => {
              this.clients = this.clients.pipe(
                map(res => {
                  let index = res.indexOf(cli)
                  res.slice(index, 1)
                  return res;
                })
              )
              Swal.fire(
                'Supprimer!',
                'le client est bien supprimé.',
                'success'
              )
            }, error: err => {
              Swal.fire(
                'Erreur!',
                'Impossible de supprimé ce client.',
                'error'
              )
            }
          })
      } else {
        Swal.fire(
          'Annuler!',
          'la supprission est annulé.',
          'error'
        )
      }
    })
  }

}
