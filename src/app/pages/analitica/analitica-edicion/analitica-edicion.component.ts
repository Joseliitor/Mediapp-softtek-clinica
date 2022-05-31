import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Analitica } from 'src/app/_module/Analitica';

import { AnaliticaService } from 'src/app/_services/analitica.service';

@Component({
  selector: 'app-analitica-edicion',
  templateUrl: './analitica-edicion.component.html',
  styleUrls: ['./analitica-edicion.component.css']
})
export class AnaliticaEdicionComponent implements OnInit {

  form: FormGroup;
  idAnalitica: number;
  edicion: boolean;
  analitica = new Analitica;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analiticaService: AnaliticaService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      'idAnalitica': new FormControl(0),
      'descripcion': new FormControl(''),
      'nombre': new FormControl(''),
    });
    this.route.params.subscribe(data => {
      this.idAnalitica = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }
  initForm() {
    if (this.edicion) {
      this.analiticaService.listarPorId(this.idAnalitica).subscribe(data => {
        this.form = new FormGroup({
          'idAnalitica': new FormControl(data.idAnalitica),
          'descripcion': new FormControl(data.descripcion),
          'nombre': new FormControl(data.nombre),
        })
      })
    }
  }
  operar() {
    this.analitica.idAnalitica = this.form.value['idAnalitica'];
    this.analitica.descripcion = this.form.value['descripcion'];
    this.analitica.nombre = this.form.value['nombre'];
    if (this.edicion) {
      this.analiticaService.modificar(this.analitica).subscribe(() => {
        this.analiticaService.listar().subscribe(analitica => {
          this.analiticaService.analiticaCambio.next(analitica);
          this.analiticaService.setMensajeCambio("Se ha modificado");
        });
        this.analiticaService.getMensajeCambio().subscribe(data => {
          this.snackBar.open(data, 'AVISO', { duration: 2000 });
        })
      });
    } else {
      this.analiticaService.registrar(this.analitica).pipe(switchMap(() => {
        return this.analiticaService.listar();
      }))
        .subscribe(analitica => {
          this.analiticaService.analiticaCambio.next(analitica);
          this.analiticaService.setMensajeCambio("Se ha registrado");
        })
      this.analiticaService.getMensajeCambio().subscribe(data => {
        this.snackBar.open(data, 'AVISO', { duration: 2000 });
      })
    }
    this.router.navigate(['analitica']);
  }
}