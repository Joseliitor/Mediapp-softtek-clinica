import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../_module/Especialidad';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad>{

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/especialidad`
    );
  }
  getEspecialidadCambio() {
    return this.especialidadCambio.asObservable();
  }
  setEspecialidadCambio(especialidades: Especialidad[]) {
    this.especialidadCambio.next(especialidades);
  }
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
