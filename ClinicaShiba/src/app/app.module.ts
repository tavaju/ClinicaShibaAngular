import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ScrollRevealDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
