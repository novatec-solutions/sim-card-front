import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './atoms/button/button.component';
import { DialogComponent } from './organisms/dialog/dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ButtonComponent,
    DialogComponent
  ]
})
export class CoreModule { }
