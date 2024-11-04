import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";

import { CountriesModule } from "./countries/countries.module";

import { HomePageComponent } from "./shared/components/home-page/home-page.component";
import { AboutPageComponent } from "./shared/components/about-page/about-page.component";
import { ContactPageComponent } from "./shared/components/contact-page/contact-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "about",
    component: AboutPageComponent
  },
  {
    path: "contact",
    component: ContactPageComponent
  },
  {
    path: "countries",
    loadChildren: () => import("./countries/countries.module").then(m => m.CountriesModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
