import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
   }

   // guard-- si existe token entonces está logueado
   estaLogueado() {
     return ( this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
      if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse( localStorage.getItem('usuario'));
        this.usuario = JSON.parse( localStorage.getItem('menu'));

      } else {
        this.token = '';
        this.usuario = null;
        this.menu = [];
      }
   }

   guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));


    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    // console.log(this.menu);
   }

   logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

   }

   loginGoogle( token: string ) {
      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token }).pipe(map( (resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
        // console.log( resp);
        return true;
      }));
   }

   login( usuario: Usuario, recordar: boolean = false ) {
      if ( recordar ) {
        localStorage.setItem('email', usuario.email );
      } else {
        localStorage.removeItem( 'email' );
      }
      let url = URL_SERVICIOS + '/login';
      return this.http.post( url , usuario ).pipe(
        map( (resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

          // console.log( resp);
          // localStorage.setItem('id', resp.id);
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

          return true;
          }),
        catchError( err => {
          // console.log( err.status);
          console.log( err.error.mensaje);
          swal( 'Error en el login', 'Credenciales incorrectas', 'error' );
          return throwError(err); })
      );

   }

   crearUsuario( usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';
     return this.http.post( url , usuario ).pipe(map( (resp: any) => {
            swal('Usuario creado', usuario.email, 'success' );
            return resp.usuario;
      } ),
      catchError( err => {
        // console.log( err.status);
        console.log( err.error.mensaje);
        swal( err.error.mensaje, err.error.errors.message , 'error' );
        return throwError(err); })
    );

   }

   actualizarUsuario( usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;
    //  console.log( url );

     return this.http.put( url, usuario).pipe(map(( resp: any) => {
       if ( usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu);
       }

       swal('Usuario actualizado!', this.usuario.nombre, 'success');

       return true;
     }),
     catchError( err => {
       // console.log( err.status);
       console.log( err.error.mensaje);
       swal( err.error.mensaje, err.error.errors.message , 'error' );
       return throwError(err); })
    );

   }

   cambiarImagen( archivo: File, id: string) {

      this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {
            // console.log( resp );
            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success');

            this.guardarStorage( id, this.token, this.usuario, this.menu );

          }).catch( resp => {
            console.log( resp );
          });

   }

   cargarUsuarios( desde: number ) {
     let url = URL_SERVICIOS + '/usuario?desde=' + desde;

     return this.http.get( url );
   }

   buscarUsuarios ( termino: string) {
     let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
     return this.http.get( url );
    //  .pipe(map( (resp: any) => resp.usuarios));
   }

    borrarUsuario (id: string) {
      let url = URL_SERVICIOS + '/usuario/' + id  ;
      url += '?token=' + this.token;

      return this.http.delete( url ).pipe(map( resp => {
        swal('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
        return true;
      }));
    }

}
