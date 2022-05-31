import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/_module/paciente';
import { PacientesService } from 'src/app/_services/pacientes.service';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  form: FormGroup;
  id: number;
  edicion: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacientesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl('')
    });
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })

  }
  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono),
          'email': new FormControl(data.email)
        })
      })
    }
  }

  operar() {
    alert('entrada')
    let paciente = new Paciente();

    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.direccion = this.form.value['direccion'];
    paciente.telefono = this.form.value['telefono'];
    paciente.email = this.form.value['email'];

    if (this.edicion) {
      this.pacienteService.modificar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.setMensajeCambio("SE MODIFICO");
        });
      });
    } else {

      this.pacienteService.registrar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.setMensajeCambio("SE INSERTO");
        });
      });
    }
    this.router.navigate(['pacientes']);
  }

}
