import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem( 'email' ) || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '5097426561-3bsoec6m4vaps99e7cu1hql02tr768e2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
    });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token ).subscribe( resp => {
        window.location.href = '#/dashboard';
        // this.router.navigate(['/dashboard']);
           });
    });
  }

  ingresar( forma: NgForm) {
    // console.log(forma.valid);
    // console.log(forma.value);
    if ( !forma.valid) {
      return;
    }


    let usuario = new Usuario(null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( correcto => this.router.navigate(['/dashboard']));
    // console.log('ingresando');
    // this.router.navigate(['/dashboard']);

  }

}
