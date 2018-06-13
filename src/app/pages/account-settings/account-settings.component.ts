import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {
    this.aplicarCheck(link);
    this._ajustes.aplicarTema( tema );
    // tslint:disable-next-line:prefer-const
    // let url = `assets/css/colors/${ tema }.css`;
    // this._document.getElementById('tema').setAttribute('href', url);

    // this._ajustes.ajustes.tema = tema ;
    // this._ajustes.ajustes.temaUrl = url;
    // this._ajustes.guardarAjustes();
  }

  aplicarCheck(link: any) {
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    // tslint:disable-next-line:prefer-const
    for ( let ref of selectores) {
        ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck( ) {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for ( let ref  of selectores) {
        if (tema === ref.getAttribute('data-theme')) {
          ref.classList.add('working');
          break;
        }
    }
  }
}
