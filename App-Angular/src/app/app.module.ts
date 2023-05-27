import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { WebsiteLayoutComponent } from './component/layout/website-layout/website-layout.component';
import { HomeComponent } from './page/home/home.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './page/login/register/register.component';
import { SigninComponent } from './page/login/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WebsiteLayoutComponent,
    HomeComponent,
    ProductDetailComponent,
    NotFoundComponent,
    AboutComponent,
    RegisterComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
