import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../services/compte.service';
import { detailsDeCompte } from '../modele/Compte.modele';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  formulaireCompte!: FormGroup
  formulaireOperations!: FormGroup
  pageCourant: number = 0
  sizePge: number = 5
  detailsCompte!: Observable<detailsDeCompte>
  constructor(private fb: FormBuilder, private compteservice: CompteService) { }
  ngOnInit(): void {
    this.formulaireCompte = this.fb.group({
      idcompt: this.fb.control('')
    })
    this.formulaireOperations = this.fb.group({
      idDestination: this.fb.control(null),
      typeoperation: this.fb.control(null, [Validators.required]),
      montant: this.fb.control(0, [Validators.required]),
      description: this.fb.control(null, [Validators.required])
    })
  }
  rechercherCompte() {
    let id: String = this.formulaireCompte.value.idcompt
    this.detailsCompte = this.compteservice.getCompte(id, this.pageCourant, this.sizePge)
  }
  changePage(page: number) {
    this.pageCourant = page;
    this.rechercherCompte();
  }
  orationSurCompte() {
    let id = this.formulaireCompte.value.idcompt;
    let type = this.formulaireOperations.value.typeoperation;
    if (type == 'Versement') {
      this.compteservice.versemant(id, this.formulaireOperations.value.montant, this.formulaireOperations.value.description).subscribe({
        next: res => {
          Swal.fire(
            'Ajouter!',
            'l\'opération est de versement bien effectué.',
            'success'
          )
          this.rechercherCompte();
        }
      })
    } else if (type == 'Retrait') {
      this.compteservice.retrait(id, this.formulaireOperations.value.montant, this.formulaireOperations.value.description).subscribe({
        next: res => {
          Swal.fire(
            'Ajouter!',
            'l\'opération est de retrait bien effectué.',
            'success'
          )
          this.rechercherCompte();
        }
      })
    } else {
      this.compteservice.virsement(id, this.formulaireOperations.value.idDestination, this.formulaireOperations.value.montant).subscribe({
        next: res => {
          Swal.fire(
            'Virement!',
            'l\'opération est de virement bien effectué.',
            'success'
          )
          this.rechercherCompte();
        }
      })
    }

  }


}
