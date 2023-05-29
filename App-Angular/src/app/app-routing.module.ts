import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLayoutComponent } from './component/layout/website-layout/website-layout.component';
import { HomeComponent } from './page/home/home.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { RegisterComponent } from './page/login/register/register.component';
import { ProductAddComponent } from './page/admin/product-add/product-add.component';
import { UpdateProductComponent } from './page/admin/update-product/update-product.component';
import { ProductListComponent } from './page/admin/product-list/product-list.component';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { SigninComponent } from './page/login/signin/signin.component';

const routes: Routes = [
  {path: "",component: WebsiteLayoutComponent,
  children: [
    {path: "",redirectTo: "home",pathMatch: 'full'},
    {path: "home",component: HomeComponent},
    {path: "product/:id",component: ProductDetailComponent},
    {path: "about",component: AboutComponent},
    {path: "signup",component: RegisterComponent},
    {path: "signin",component:SigninComponent}
  ]
},
  {path: "admin",component: AdminLayoutComponent,
  children: [
    {path: "",redirectTo: "dashboard",pathMatch: "full"},
    {path: "dashboard",component: DashboardComponent},
    {path:"products/add",component: ProductAddComponent},
    {path:"products/:id/update",component: UpdateProductComponent},
    {path: "products/list",component:ProductListComponent},
  ]},
{path: "**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
