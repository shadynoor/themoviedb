import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { SeriesComponent } from './series/series.component';
import { MoviesComponent } from './movies/movies.component';
import { PeopleComponent } from './people/people.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MoviedetailComponent } from './movies/moviedetail/moviedetail.component';
import { SafePipe } from './safe.pipe';
import { SeriesdetailsComponent } from './series/seriesdetails/seriesdetails.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { SlicePipe } from './services/slice.pipe';
import { CommentsComponent } from './comments/comments.component';
import { DetailsComponent } from './people/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    SeriesComponent,
    MoviesComponent,
    PeopleComponent,
    ContactsComponent,
    ErrorComponent,
    MoviedetailComponent,
    SafePipe,
    SeriesdetailsComponent,
    AuthComponent,
    SlicePipe,
    CommentsComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
