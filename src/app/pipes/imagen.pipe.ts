import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    // si no hay foto usar noimg
    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0) {
      return img;
    }
    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'hospital':
        url += '/hospitales/' + img;
      break;
      case 'medico':
        url += '/medicos/' + img;
      break;
      default:
        console.log(' tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
