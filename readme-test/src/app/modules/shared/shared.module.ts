// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

// Components
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeadingSectionComponent } from './components/heading-section/heading-section.component';
import { ToastComponent  } from './components/toast/toast.component';
import { FileUploadController } from '../shared/controllers/file-uploader.controller';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoaderComponent } from './components/loader/loader.component';

// Pipes
import { StatusPipe } from './pipes/status.pipe';
import { NameCollectionPipe } from './pipes/name-collection.pipe';
import { TruncatePipe } from './pipes/limitTo.pipe';

// Directives
import { DateTimePickerDirective } from './directives/date-time-picker/date-time-picker.directive';

// Services
import { ToastController } from './controllers/toast.controller';
import { LoaderService } from './components/loader/loader.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    SidenavComponent,
    HeadingSectionComponent,
    ChangePasswordComponent,
    LoaderComponent,
    ToastComponent,
    StatusPipe,
    NameCollectionPipe,
    TruncatePipe,
    DateTimePickerDirective
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    HeadingSectionComponent,
    LoaderComponent,
    StatusPipe,
    NameCollectionPipe,
    TruncatePipe,
    DateTimePickerDirective
  ],
  entryComponents: [
    ToastComponent,
    ChangePasswordComponent
  ],
  providers: [
    ToastController,
    FileUploadController,
    LoaderService
  ]
})
export class SharedModule { }
