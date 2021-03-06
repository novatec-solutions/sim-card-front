import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationFormComponent } from './pages/form/migration-form.component';
import { MigrationHelpComponent } from './pages/help/migration-help.component';

const routes: Routes = [
  {
    path: '',
    component: MigrationFormComponent,
    data: { animation: 'MigrationFormComponent' }
  },
  {
    path: 'help',
    component: MigrationHelpComponent,
    data: { animation: 'MigrationHelpComponent' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MigrationRoutingModule { }
