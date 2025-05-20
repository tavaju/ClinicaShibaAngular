import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MaterialModule } from './shared/material.module';

// Pet components
import { PetListComponent } from './pages/pets/pet-list/pet-list.component';
import { PetFormComponent } from './pages/pets/pet-form/pet-form.component';
import { PetDetailComponent } from './pages/pets/pet-detail/pet-detail.component';
import { PetBannerComponent } from './pages/pets/pet-banner/pet-banner.component';

// Client components
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { LoginUserComponent } from './pages/login/login-user/login-user.component';
import { ClientInfoComponent } from './pages/clients/client-info/client-info.component';
import { VetInfoComponent } from './pages/clients/vets/vet-info/vet-info.component';
import { VetFormComponent } from './pages/clients/vets/vet-form/vet-form.component';
import { VetListComponent } from './pages/clients/vets/vet-list/vet-list.component';
import { GiveTreatmentComponent } from './pages/pets/give-treatment/give-treatment.component';
import { LoginVeterinarianComponent } from './pages/login/login-veterinarian/login-veterinarian.component';
import { VetDashboardComponent } from './pages/clients/vets/vet-dashboard/vet-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginAdminComponent } from './pages/login/login-admin/login-admin.component';
import { CaptchaComponent } from './pages/login/captcha/captcha.component';
import { ChatbotComponent } from './core/chatbot/chatbot.component';
import { ShopComponent } from './pages/shop/shop.component';

// Import PrimeNG module
import { PrimeNgModule } from './shared/primeng/primeng.module';

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
    PetBannerComponent,
    // Client components
    ClientListComponent,
    ClientFormComponent,
    LoginUserComponent,
    ClientInfoComponent,
    VetInfoComponent,
    VetFormComponent,
    VetListComponent,
    GiveTreatmentComponent,
    LoginVeterinarianComponent,
    VetDashboardComponent,
    DashboardComponent,
    LoginAdminComponent,
    CaptchaComponent,
    ChatbotComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RecaptchaV3Module,
    MaterialModule,
    PrimeNgModule
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcqFiorAAAAAE93zbwpa7R9gZvXCGMj91ckZNf5' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
