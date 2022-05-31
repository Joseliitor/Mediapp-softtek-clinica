import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_module/paciente';

@Injectable({ //esto es una anotacion inyectable. en spring seria @componente, @repository o alguna de estas. con esto podemos haccer la movida en el constructor de paciente.ts
  providedIn: 'root'
})
export class PacientesService {


  private url: string = `${environment.HOST}/paciente`;
  pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { } //inyectamos esto para poder trabajar

  listar() {
    return this.http.get<Paciente[]>(this.url)
  }
  listarPorId(referencia: number) {
    return this.http.get<Paciente>(`${this.url}/${referencia}`);

  }

  registrar(paciente: Paciente) {
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(this.url, paciente);
  }

  eliminar(referencia: number) {
    return this.http.delete<Paciente>(`${this.url}/${referencia}`);
  }
  //Setters y getters 
  getPacienteCambio() {
    return this.pacienteCambio.asObservable();
  }
  setPacienteCambio(pacientes: Paciente[]) {
    this.pacienteCambio.next(pacientes);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensajeCambio: string) {
    this.mensajeCambio.next(mensajeCambio);
  }
}
