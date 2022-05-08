import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'migration',
    loadChildren: () =>
      import('./modules/migration/migration.module').then((m) => m.MigrationModule),
  },
  {
    path: 'pin',
    loadChildren: () =>
      import('./modules/pin/pin.module').then((m) => m.PinModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/migration'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
