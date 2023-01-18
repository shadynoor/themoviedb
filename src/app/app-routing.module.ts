import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MoviedetailComponent } from './movies/moviedetail/moviedetail.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './people/details/details.component';
import { PeopleComponent } from './people/people.component';
import { SeriesComponent } from './series/series.component';
import { SeriesdetailsComponent } from './series/seriesdetails/seriesdetails.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'' , redirectTo:'home' ,pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'movies/:id' , component:MoviedetailComponent},
  {path:'about' , component:AboutComponent},
  {path:'series' , component:SeriesComponent},
  {path:'series/:id' , component:SeriesdetailsComponent},
  {path:'movies' , component:MoviesComponent},
  {path:'contacts' , component:ContactsComponent },
  {path:'actors' , component:PeopleComponent},
  {path:'actors/:id' , component:DetailsComponent},

  {path:'auth' , component:AuthComponent , canActivate:[AuthGuard]},
  {path:'**' , component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
