import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './atoms/button/button.component';
import { DialogComponent } from './organisms/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    DialogComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  exports:[
    ButtonComponent,
    DialogComponent
  ]
})
export class CoreModule { }
