import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Paciente } from 'src/app/_module/paciente';
import { MatSort, Sort } from '@angular/material/sort';

import { PacientesService } from 'src/app/_services/pacientes.service';



@Component({

  selector: 'app-paciente',

  templateUrl: './paciente.component.html',

  styleUrls: ['./paciente.component.css']

})

export class PacienteComponent implements OnInit {

  pacientes: Paciente[];

  origen: MatTableDataSource<Paciente>;

  columnasAMostrar: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];



  constructor(private pacienteService: PacientesService) { }



  ngOnInit(): void {

    this.pacienteService.pacienteCambio.subscribe(data => {

      this.origen = new MatTableDataSource(data);
    });

    this.pacienteService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data)
    })
    // this.origen.sort = this.sort;

    // this.origen.paginator = this.paginator;

  }
  eliminar(referencia: number){
    this.pacienteService.eliminar(referencia);
  }
}
