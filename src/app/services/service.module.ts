import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService,
         SharedService,
         SidebarService,
         UsuarioService,
         HospitalService,
         MedicoService,
         LoginGuardGuard,
         AdminGuard,
         VerificaTokenGuard} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SettingsService,
               SharedService,
               SidebarService,
               UsuarioService,
               LoginGuardGuard,
               AdminGuard,
               VerificaTokenGuard,
               ModalUploadService,
               HospitalService,
               MedicoService],
  declarations: []
})
export class ServiceModule { }
