import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLayoutComponent } from './component/layout/website-layout/website-layout.component';
import { HomeComponent } from './page/home/home.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { AboutComponent } from './page/about/about.component';
import { RegisterComponent } from './page/login/register/register.component';

const routes: Routes = [
  {path: "",component: WebsiteLayoutComponent,
  children: [
    {path: "",redirectTo: "home",pathMatch: 'full'},
    {path: "home",component: HomeComponent},
    {path: "product/:id",component: ProductDetailComponent},
    {path: "about",component: AboutComponent},
    {path: "signup",component: RegisterComponent}
  ]
},
{path: "**",component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
