import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { BlogComponent } from './pages/blog/blog.component';

// Import pet components
import { PetListComponent } from './pages/pets/pet-list/pet-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';

// Import client components
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';

// Import CTA component
import { CtaComponent } from './pages/home/cta/cta.component';

// Import Login Component
import { LoginUserComponent } from './pages/login/login-user/login-user.component';
import { ClientInfoComponent } from './pages/clients/client-info/client-info.component';
import { VetListComponent } from './pages/clients/vets/vet-list/vet-list.component';
import { VetFormComponent } from './pages/clients/vets/vet-form/vet-form.component';
import { VetInfoComponent } from './pages/clients/vets/vet-info/vet-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specialties', component: SpecialtiesComponent },
  { path: 'blog', component: BlogComponent },

  // Pet routes
  { path: 'pets', component: PetListComponent },
  { path: 'pets/add', component: PetFormComponent },
  { path: 'pets/edit/:id', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailComponent },

  // Client routes
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent },
  { path: 'clients/info', component: ClientInfoComponent },

  // Vet routes
  { path: 'vets', component: VetListComponent },
  { path: 'vets/add', component: VetFormComponent },
  { path: 'vets/edit/:id', component: VetFormComponent },
  { path: 'vets/info', component: VetInfoComponent },
  { path: 'vets/info/:id', component: VetInfoComponent },

  // CTA route within Home
  { path: 'cta', component: CtaComponent },

  // Login route
  { path: 'login', component: LoginUserComponent },

  // Always put the wildcard route last
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
