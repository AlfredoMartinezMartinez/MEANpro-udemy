import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  // oculto: string = '';

  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) {

    // console.log('modal listo');
  }

  ngOnInit() {
  }

  subirImagen() {
    // console.log('))))');
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {
            // console.log( resp );
            this._modalUploadService.notificacion.emit( resp );
            this._modalUploadService.ocultarModal();
        }).catch( err => {
          console.log('Error en la carga');
        });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    // console.log(archivo);
    if ( archivo.type.indexOf('image') < 0) {
      swal('solo imágenes', 'el archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      // console.log( reader.result);
      this.imagenTemp = reader.result;
    };

  }

}
