import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Medico } from 'src/app/_module/Medico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicoService } from 'src/app/_services/medico.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
}) export class MedicoDialogoComponent implements OnInit {
  medico: Medico
  edicion: boolean;

  clon: Medico = this.data;
  //clonamos el objeto para enviarlo como nuevo una vez editado

  constructor(
    private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<MedicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medico = { ...this.data };
    if (this.data) {
      this.edicion = true;
    } else {
      this.edicion = false;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  agregar() {
    if (this.edicion) {
      this.medicoService.modificar(this.medico).subscribe(() => {
        this.medicoService.listar().subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("Se modifico");
          this.snackBar.open("modificado", "close");
        });
      });
    } else {
      this.medicoService.registrar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
        .subscribe(medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.setMensajeCambio("SE REGISTRO");
        })
      this.snackBar.open("registrado", "close");
      this.medicoService.getMensajeCambio().subscribe(data => {
        this.snackBar.open(data, 'AVISO', { duration: 2000 });
      })
    }
    this.cancelar();
  }
}

