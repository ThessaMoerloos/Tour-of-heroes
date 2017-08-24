import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule}    from '@angular/forms';
//import { RouterModule }   from '@angular/router'; // a route to the heroes component.

import { HttpModule }    from '@angular/http'; // om een web api te kunnen gebruiken
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent }  from './app.component';
import { DashboardComponent }  from './dashboard.component';

import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';
import { HeroSearchComponent }     from './hero-search.component';

import { AppRoutingModule }     from './app-routing.module';// als vervanging voor de routing die hiervoor stond.



@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule,  InMemoryWebApiModule.forRoot(InMemoryDataService) ],
  declarations: [ AppComponent, DashboardComponent, HeroDetailComponent, HeroesComponent, HeroSearchComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ HeroService ]
})

export class AppModule { }
