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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './component/search/search.component';
import { ProductAddComponent } from './page/admin/product-add/product-add.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { ProductListComponent } from './page/admin/product-list/product-list.component';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { UpdateProductComponent } from './page/admin/update-product/update-product.component';
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
    SigninComponent,
    SearchComponent,
    ProductAddComponent,
    DashboardComponent,
    ProductListComponent,
    AdminLayoutComponent,
    UpdateProductComponent
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
