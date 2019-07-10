import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';
import { FirebaseModule } from './modules/firebase.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FirebaseModule,
    FlexLayoutModule,
    HeaderComponent,
    FooterComponent
  ],
})
export class SharedModule {}
