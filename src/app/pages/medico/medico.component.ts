import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_module/Medico';
import { MedicoService } from 'src/app/_services/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  origen: MatTableDataSource<Medico>;
  columnasAMostrar: String[] = ['idMedico', 'nombres', 'apellidos', 'acciones'];

  columnasChild: string[] = ['nombres', 'apellidos', 'cedula', 'fotoUrl'];
  datos: Articulo[] = [];
  dataSource: any;
  firstLastButtons = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private liveAnnouncer: LiveAnnouncer;


  constructor(private medicoService: MedicoService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.medicoService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);
      this.origen.sort = this.sort;
      this.origen.paginator = this.paginator;
    })
    this.medicoService.medicoCambio.subscribe(data => {
      this.origen = new MatTableDataSource(data);
    });
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }


  abrirDialogo(medico?: Medico): void {

    const dialogo1 = this.dialog.open(MedicoDialogoComponent, {
      data: medico
    });

  }

  agregar(medico: Medico) {
    this.medicoService.registrar(medico);
  }
  cambioFiltro(event: Sort) {
    if (event.direction) {
      this.liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}


export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}