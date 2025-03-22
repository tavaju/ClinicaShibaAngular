import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specialties', component: SpecialtiesComponent },
  { path: '**', redirectTo: '' }, // Redirección en caso de rutas no existentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
