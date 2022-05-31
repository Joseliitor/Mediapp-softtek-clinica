import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from 'src/app/_module/Especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form: FormGroup;
  idEspecialidad: number;
  edicion: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private especialidadService: EspecialidadService
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      'idEspecialidad': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });
    this.route.params.subscribe(data => {
      this.idEspecialidad = data['idEspecialidad'];
      this.edicion = data['idEspecialidad'] != null;
      this.initForm();
    })
  }
  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.idEspecialidad).subscribe(data => {
        this.form = new FormGroup({
          'idEspecialidad': new FormControl(data.idEspecialidad),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        })
      })
    }
  }

  operar() {
    let especialidad = new Especialidad();

    especialidad.idEspecialidad = this.form.value['idEspecialidad'];
    especialidad.descripcion = this.form.value['descripcion'];
    especialidad.nombre = this.form.value['nombre'];

    if (this.edicion) {
      this.especialidadService.modificar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.setMensajeCambio("SE MODIFICO");
        });
      });
    } else {

      this.especialidadService.registrar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.setMensajeCambio("SE INSERTO");
        });
      });
    }
    this.router.navigate(['especialidad']);
  }

}
