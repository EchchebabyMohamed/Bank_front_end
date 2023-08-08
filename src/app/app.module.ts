import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientsComponent } from './clients/clients.component';
import { ComptesComponent } from './comptes/comptes.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NouveauClientComponent } from './nouveau-client/nouveau-client.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
const routes: Routes = [
  { path: "clients", component: ClientsComponent },
  { path: "comptes", component: ComptesComponent },
  { path: "nouveau_client", component: NouveauClientComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    ComptesComponent,
    NouveauClientComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
