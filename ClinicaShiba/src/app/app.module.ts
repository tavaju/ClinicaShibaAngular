import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { BannerComponent } from './core/banner/banner.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/home/features/features.component';
import { SpecialtiesComponent } from './pages/home/specialties/specialties.component';
import { TestimonialsComponent } from './pages/home/testimonials/testimonials.component';
import { BlogComponent } from './pages/home/blog/blog.component';
import { CtaComponent } from './pages/home/cta/cta.component';
import { FooterComponent } from './core/footer/footer.component';
import { ScrollRevealDirective } from './shared/scroll-reveal.directive';

// Import pet components
import { PetListComponent } from './pages/pets/pet-list/pet-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';
import { PetBannerComponent } from './pages/pets/pet-banner/pet-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    HeroComponent,
    HomeComponent,
    FeaturesComponent,
    SpecialtiesComponent,
    TestimonialsComponent,
    BlogComponent,
    CtaComponent,
    FooterComponent,
    ScrollRevealDirective,
    // Pet components
    PetListComponent,
    PetFormComponent,
    PetDetailComponent,
    PetBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
