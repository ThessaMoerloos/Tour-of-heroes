import { Component, OnInit } from '@angular/core';
/* Deze importeert de hero classe met alle eigenschappen die de heroes kunnen hebben */
/* die stond vroeger hieronder maar deze horen voor orde in elk hun eigen file's te staan */
import { Hero } from './hero';
import { HeroService } from './hero.service';

import { Router} from '@angular/router';



@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]


})





export class HeroesComponent  implements OnInit {

  //heroes = public property dat er voor zorgt dat HEROES gebruikt kan worden
  /* hier stond vroeger de lijst de mock heroes */
  heroes: Hero[];
  selectedHero: Hero;

  //implementeren van service
  constructor(
              private heroService: HeroService,
              private router: Router
            ) { }


  //metode maken om de heroes op te halen/get heroes
  getHeroes(): void {
    this.heroService.getHeroes()
                    .then(heroes => this.heroes = heroes);
  }

  //effectief ophalen van de heroes
  ngOnInit(): void {
  this.getHeroes();
}

  //als er een hero geselecteerd wordt
  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

// om een hero toe te voegen
  add(name: string): void {
    name = name.trim(); // .trim() haalt alle spaties weg uit u string

    if (!name) { return; } // als de naam 'leeg' is: return
    //als hij niet leeg is:
    this.heroService.create(name) // maak de naam aan
      .then(hero => {
        this.heroes.push(hero); // push hem in de lijst van heroes
        this.selectedHero = null;
      });
  }

// om een hero te verwijderen - dit wordt effectief gedaan in hero.service
  delete(hero: Hero): void { // component gaat de weergave updaten
  this.heroService
      .delete(hero.id) //verwijderd de hero met de id van de weergave
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; } // en gaat de vorige geselecteerde hero resetten
      });
}



}
