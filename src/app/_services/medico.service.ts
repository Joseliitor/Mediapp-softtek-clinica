import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../_module/Medico';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{


  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/medico`
    );
  }
  getMedicoCambio() {
    return this.medicoCambio.asObservable();
  }
  setMedicoCambio(medicos: Medico[]) {
    this.medicoCambio.next(medicos);
  }
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
