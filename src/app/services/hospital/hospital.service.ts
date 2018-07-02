import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _usuarioService: UsuarioService ) {
                // this.cargarStorage();
                }
  // cargarStorage() {
  //   if ( localStorage.getItem('token')) {
  //     this.token = localStorage.getItem('token');
  //     this.usuario = JSON.parse( localStorage.getItem('usuario'));
  //   } else {
  //           this.token = '';
  //           this.usuario = null;
  //          }
  // }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url );
  }

  obtenerHospital ( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital ( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url ).pipe(map( res => {
      swal( 'Hospital borrado', 'El hospital ha sido borrado correctamente', 'success');
      return true;
    }));
  }

  crearHospital ( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital/' ;
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, {nombre} ).pipe(map( (resp: any) => {
      swal( 'Hospital creado', 'El hospital ha sido creado correctamente', 'success');
      return resp.hospital;
    }));
  }

  actualizarHospital ( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id ;
    url += '?token=' + this._usuarioService.token;
    // console.log(url);
    return this.http.put( url , hospital ).pipe(map( (resp: any) => {
      swal('Hospital actualizado!', resp.hospital.nombre, 'success');
      return true;
    }));
  }

  buscarHospital ( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url );
  }
}
