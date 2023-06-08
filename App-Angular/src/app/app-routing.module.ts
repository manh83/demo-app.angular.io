import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLayoutComponent } from './component/layout/website-layout/website-layout.component';
import { HomeComponent } from './page/home/home.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { ProductAddComponent } from './page/admin/product-add/product-add.component';
import { UpdateProductComponent } from './page/admin/update-product/update-product.component';
import { ProductListComponent } from './page/admin/product-list/product-list.component';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { SigninComponent } from './page/login/signin/signin.component';
import { CategoryAddComponent } from './page/admin/category-add/category-add.component';
import { CategoryListComponent } from './page/admin/category-list/category-list.component';
import { CategoryUpdateComponent } from './page/admin/category-update/category-update.component';
import { SignupComponent } from './page/login/signup/signup.component';
import { ForgotPasswordComponent } from './page/login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './page/login/change-password/change-password.component';
import { CartComponent } from './page/cart/cart.component';
import { PayComponent } from './page/pay/pay.component';

const routes: Routes = [
  {path: "",component: WebsiteLayoutComponent,
  children: [
    {path: "",redirectTo: "home",pathMatch: 'full'},
    {path: "home",component: HomeComponent},
    {path:"about",component:AboutComponent},
    {path: "product/:id",component: ProductDetailComponent},
    {path: "about",component: AboutComponent},
    {path: "signup",component: SignupComponent},
    {path: "signin",component:SigninComponent},
    {path: "forgot-password",component:ForgotPasswordComponent},
    {path: "changePassword",component:ChangePasswordComponent},
    {path: "cart",component: CartComponent},
    {path: "pay",component: PayComponent}
  ]
},
  {path: "admin",component: AdminLayoutComponent,
  children: [
    {path: "",redirectTo: "dashboard",pathMatch: "full"},
    {path: "dashboard",component: DashboardComponent},
    {path:"products/add",component: ProductAddComponent},
    {path:"products/:id/update",component: UpdateProductComponent},
    {path: "products/list",component:ProductListComponent},
    {path: "categories/add",component: CategoryAddComponent},
    {path: "categories/list",component:CategoryListComponent},
    {path: "categories/:id/update",component: CategoryUpdateComponent}
  ]},
{path: "**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
