import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import {appRoutes} from "./routes";

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { NgxEditorModule } from 'ngx-editor';

import { NgxGalleryModule } from 'ngx-gallery-9';
import { CityDetailComponent } from './city/cityDetail/cityDetail.component';
import { CityAddComponent } from './city/cityAdd/cityAdd.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [					
    AppComponent,
      ValueComponent,
      NavComponent,
      CityComponent,
      CityDetailComponent,
      CityAddComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   *
   */
 

 }
