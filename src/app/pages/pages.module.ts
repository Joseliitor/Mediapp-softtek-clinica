import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnaliticaEdicionComponent } from './analitica/analitica-edicion/analitica-edicion.component';
import { AnaliticaComponent } from './analitica/analitica.component';
import { EspecialidadEdicionComponent } from './especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';

import { LoginComponent } from './login/login.component';
import { MedicoDialogoComponent } from './medico/medico-dialogo/medico-dialogo.component';
import { MedicoComponent } from './medico/medico.component';
import { OrganizarMaterialModule } from './organizar-material/organizarMaterial.module';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { LayoutComponent } from './layout/layout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        OrganizarMaterialModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        MedicoComponent,
        PacienteComponent,
        PacienteEdicionComponent,
        MedicoDialogoComponent,
        EspecialidadComponent,
        EspecialidadEdicionComponent,
        AnaliticaComponent,
        AnaliticaEdicionComponent,
        LoginComponent,
        LayoutComponent,
        InicioComponent,
    ],
    providers: [],
})
export class pagesModule { }
