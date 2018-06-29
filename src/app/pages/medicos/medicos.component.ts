import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];


  constructor( public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe( medicos => {
      this.medicos = medicos;
      // console.log(this.medicos);

    });
  }

  buscarMedico( termino: string) {
    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    // this.cargando = true;
    this._medicoService.buscarMedico(termino)
        .subscribe( (resp: any) => {
          // this.totalRegistros = resp.total;
          this.medicos = resp.medicos;
          // this.desde = resp.usuarios.length;
          // this.cargando = false;
        });
  }

  borrarMedico( medico: Medico) {
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }) .then( borrar => {
      if ( borrar ) {
        this._medicoService.borrarMedico(medico._id)
                            .subscribe( borrado => {
                                // console.log( borrado );
                                this.cargarMedicos();
                            });
      }
    });
  }

}
