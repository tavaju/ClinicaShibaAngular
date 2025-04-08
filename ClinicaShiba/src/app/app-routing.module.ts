import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { BlogComponent } from './pages/blog/blog.component';

// Import pet components
import { PetListComponent } from './pages/pets/pet-list/pet-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';

// Import CTA component
import { CtaComponent } from './pages/home/cta/cta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specialties', component: SpecialtiesComponent },
  { path: 'blog', component: BlogComponent },

  // Pet routes
  { path: 'pets', component: PetListComponent },
  { path: 'pets/add', component: PetFormComponent },
  { path: 'pets/edit/:id', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailComponent },
  
  // CTA route within Home
  { path: 'cta', component: CtaComponent },

  // Always put the wildcard route last
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}