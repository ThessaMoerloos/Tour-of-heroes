import { Injectable } from '@angular/core';
import { Hero }       from './hero';
import { HEROES } from './mock-heroes'; // importeren van de mock heroes zodat deze er aan kan

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable() /*good practice om dit al toe te voegen.*/

export class HeroService {

  // VOOR API ------------------------------------------
  private heroesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'}); // om hero info te kunnen opslaan

  constructor(private http: Http) { }



  getHero(id: number): Promise<Hero> { // (id: number) om maar 1 hero op te vragen, niet de hele lijst om dan te filteren.
  const url = `${this.heroesUrl}/${id}`; // url van hier onder defineren.   =>> 'api/heroes' + /ID
  return this.http.get(url)
    .toPromise() // zet het volgende om in een promise
    .then(response => response.json().data as Hero) //ophalen data dmv json
    .catch(this.handleError); // http errors opvangen (methode is hieronder gemaakt)
  }



  getHeroes(): Promise<Hero[]> {
  return this.http.get(this.heroesUrl)
             .toPromise()
             .then(response => response.json().data as Hero[])
             .catch(this.handleError);
}


// om hero info te kunnen updaten naar de server
    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    // de methode add bij herp.component gebruikt de create() om een nieuwe hero aan te maken
    create(name: string): Promise<Hero> { // heeft de parameter naam
      return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Hero)
        .catch(this.handleError);
    }

    //methode die gebruikt wordt bij herp.component om een hero te verwijderen. wordt hier effectief verwijderd
    delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http
        .delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }




  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


 }
