import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Analitica } from 'src/app/_module/Analitica';
import { Especialidad } from 'src/app/_module/Especialidad';
import { AnaliticaService } from 'src/app/_services/analitica.service';
import { Articulo } from '../medico/medico.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit {
  private datos: Articulo[] = [];
  dataSource: any;
  firstLastButtons = true;
  origen: MatTableDataSource<Analitica>
  columnasAMostrar: string[] = ['idAnalitica', 'descripcion', 'nombre', 'acciones']

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  private liveAnnouncer: LiveAnnouncer;

  constructor(private analiticaService: AnaliticaService,
    //private snackbar:MatSnackbar
  ) { }
  ngOnInit(): void {
    this.analiticaService.analiticaCambio.subscribe(data => {
      this.origen = new MatTableDataSource(data)

      // this.origen.sort=this.sort;
      //this.origen.paginator=this.paginator;
    })
    this.analiticaService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);
      this.origen.sort = this.sort;
      this.origen.paginator = this.paginator;
    });
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator
  }
  cambioFiltro(event: Sort) {
    if (event.direction) {
      this.liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
