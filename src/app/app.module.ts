import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrganizarMaterialModule } from './pages/organizar-material/organizarMaterial.module';
import { environment } from 'src/environments/environment';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatSortModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    OrganizarMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }