import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Clients } from '../modele/clients';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-client',
  templateUrl: './nouveau-client.component.html',
  styleUrls: ['./nouveau-client.component.css']
})
export class NouveauClientComponent {

  newformulaire!: FormGroup
  constructor(private client: ClientsService, private fb: FormBuilder, private route: Router) {
    this.newformulaire = this.fb.group({
      nom: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      emai: this.fb.control(null, [Validators.email, Validators.required])
    });
  }
  nouveauClient() {
    let clien: Clients = this.newformulaire.value;
    this.client.ajouterCleients(clien).subscribe({
      next: res => {
        Swal.fire(
          'Bravo!',
          'le client est bien ajouté.',
          'success'
        )
        this.route.navigateByUrl("/clients");
      }
    });
  }

}
