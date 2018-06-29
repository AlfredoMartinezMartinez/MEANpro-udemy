import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
            .subscribe( (resp: any) => {
              // console.log( resp );
              this.totalRegistros = resp.total;
              this.hospitales = resp.hospitales;
              // this.desde = resp.usuarios.length;
              this.cargando = false;
            });
  }

  borrarHospital( hospital: Hospital ) {
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }) .then( borrar => {
      if ( borrar ) {
        this._hospitalService.borrarHospital(hospital._id)
                            .subscribe( borrado => {
                                console.log( borrado );
                                this.cargarHospitales();
                            });
      }
    });
  }
  guardarHospital( hospital: Hospital) {
    // this._usuarioService.actualizarUsuario( usuario ).subscribe( );
    this._hospitalService.actualizarHospital( hospital ).subscribe( );
  }

  buscarHospital( termino ) {
    // console.log( termino);
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
        .subscribe( (resp: any) => {
          // this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;
          // this.desde = resp.usuarios.length;
          this.cargando = false;
        });
  }

  crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
        // swal(`You typed: ${valor}`);
        if ( !valor || valor.length === 0) {
          return;
        }
        // console.log( valor);
        this._hospitalService.crearHospital( valor )
            .subscribe( ( ) => {
              this.cargarHospitales();
               });
    });

  }

  actualizarImagen( id) {

    this._modalUploadService.mostrarModal('hospitales', id);

  }

}
