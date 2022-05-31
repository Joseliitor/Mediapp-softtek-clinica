import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analitica } from '../_module/Analitica';
import { Especialidad } from '../_module/Especialidad';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService extends GenericService<Analitica>{

  analiticaCambio = new Subject<Analitica[]>();
  mensajeCambio = new Subject<string>();
  constructor(protected override http: HttpClient) {
    super(
      http, `${environment.HOST}/analitica`
    );
  }
  getMedicoCambio() {
    return this.analiticaCambio.asObservable();
  }
  setMedicoCambio(analiticas: Analitica[]) {
    this.analiticaCambio.next(analiticas);
  }
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
}
