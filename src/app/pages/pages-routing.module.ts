import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliticaEdicionComponent } from './analitica/analitica-edicion/analitica-edicion.component';
import { AnaliticaComponent } from './analitica/analitica.component';
import { EspecialidadEdicionComponent } from './especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { InicioComponent } from './inicio/inicio.component';
import { MedicoDialogoComponent } from './medico/medico-dialogo/medico-dialogo.component';
import { MedicoComponent } from './medico/medico.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'medicos', component: MedicoComponent },
    { path: 'nuevo', component: MedicoDialogoComponent },
    { path: 'medicoedit', component: MedicoDialogoComponent },
    {
        path: 'especialidades', component: EspecialidadComponent, children: [
            { path: 'nuevo', component: EspecialidadEdicionComponent },
            { path: 'edicion/:idEspecialidad', component: EspecialidadEdicionComponent }
        ]
    },
    {
        path: 'analiticas', component: AnaliticaComponent, children: [
            { path: 'nuevo', component: AnaliticaEdicionComponent },
            { path: 'edicion/:id', component: AnaliticaEdicionComponent }
        ]
    },
    {
        path: 'pacientes', component: PacienteComponent, children: [
            { path: 'nuevo', component: PacienteEdicionComponent },
            { path: 'edicion/:id', component: PacienteEdicionComponent }
        ]
    },

];

@NgModule({
    //imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
