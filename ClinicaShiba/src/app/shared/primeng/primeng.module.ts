import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG components
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    PaginatorModule,
    CardModule,
    TagModule,
    InputTextModule,
    RatingModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  exports: [
    DataViewModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    PaginatorModule,
    CardModule,
    TagModule,
    InputTextModule,
    RatingModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
})
export class PrimeNgModule {}
