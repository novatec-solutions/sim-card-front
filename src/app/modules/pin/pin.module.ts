import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinRoutingModule } from './pin-routing.module';
import { ValidatePinComponent } from './pages/validate-pin/validate-pin.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { MaxLengthDirective } from './directive/max-length.directive';
import { GeneratePinComponent } from './pages/generate-pin/generate-pin.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    GeneratePinComponent,
    ValidatePinComponent,
    MaxLengthDirective
  ],
  imports: [
    CommonModule,
    PinRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ]
})
export class PinModule { }
