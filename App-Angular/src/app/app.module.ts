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
import { SigninComponent } from './page/login/signin/signin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './component/search/search.component';
import { ProductAddComponent } from './page/admin/product-add/product-add.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { ProductListComponent } from './page/admin/product-list/product-list.component';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { UpdateProductComponent } from './page/admin/update-product/update-product.component';
import { ProductService } from './services/product.service';
import { CategoryListComponent } from './page/admin/category-list/category-list.component';
import { CategoryAddComponent } from './page/admin/category-add/category-add.component';
import { CategoryUpdateComponent } from './page/admin/category-update/category-update.component';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './page/login/signup/signup.component';
import { ForgotPasswordComponent } from './page/login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './page/login/change-password/change-password.component';
import { PaginationComponent } from './component/pagination/pagination.component';


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
    SigninComponent,
    SearchComponent,
    ProductAddComponent,
    DashboardComponent,
    ProductListComponent,
    AdminLayoutComponent,
    UpdateProductComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
