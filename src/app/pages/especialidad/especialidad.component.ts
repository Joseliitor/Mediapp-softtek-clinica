import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from 'src/app/_module/Especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';
import { Articulo } from '../medico/medico.component';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  especialidades: Especialidad[];
  private datos: Articulo[] = [];
  dataSource: any;
  firstLastButtons = true;

  origen: MatTableDataSource<Especialidad>;

  columnasAMostrar: string[] = ['idEspecialidad', 'descripcion', 'nombre', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private liveAnnouncer: LiveAnnouncer;

  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.especialidadService.especialidadCambio.subscribe(data => {

      this.origen = new MatTableDataSource(data);
    });

    this.especialidadService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data)

      this.origen.sort = this.sort;
      this.origen.paginator = this.paginator;
    });
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }
  cambioFiltro(event: Sort) {
    if (event.direction) {
      this.liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
