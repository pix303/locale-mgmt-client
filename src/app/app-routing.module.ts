import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LocaleitemDetailComponent } from './localeitem-detail/localeitem-detail.component';
import { BundleChooserComponent } from './bundle-chooser/bundle-chooser.component';


const routes: Routes = [

  {path:'', component:HomeComponent},
  {path:'welcome', component:HomeComponent},
  {path:'search', component:SearchComponent},
  {path:'localeitem-detail', component:LocaleitemDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
