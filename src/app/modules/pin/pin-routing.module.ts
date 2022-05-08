import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePinComponent } from './pages/generate-pin/generate-pin.component';
import { ValidatePinComponent } from './pages/validate-pin/validate-pin.component';

const routes: Routes = [
  {
    path: 'validate',
    component: ValidatePinComponent,
    data: { animation: 'ValidatePinComponent' }
  },
  {
    path: 'generate',
    component: GeneratePinComponent,
    data: { animation: 'GeneratePinComponent' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinRoutingModule { }
