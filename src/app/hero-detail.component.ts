import { Component, OnInit } from '@angular/core';

// voor de id parameter
import { ActivatedRoute, ParamMap } from '@angular/router'; // om paramap te kunnen gebruiken
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap'; // om switch map te kunnen gebruiken om de id te kunnen vinden

import { Hero } from './hero';
/* deze gaat er voor zorgen dat we [hero] gaan kunnen doen om zo duidelijk te maken
dat de selected hero vast hangt aan de hero  */

// voor de id parameter
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]

})


export class HeroDetailComponent implements OnInit {

 //@Input() hero: Hero; /* deze @Input kunnen we doen dmv de Input import bovenaan  */
  /*  hero (en zijn eigenschappen) wordt hier aangereikt aan andere klasses */

  /* All it does is receive a hero object through its hero input property
     and then bind to that property with its template.   */

//bovenste weg -> nu enkel dit in de plaats:
  hero: Hero;

     constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
      ) {}



      // hiermee gaan we de id kunnen ophalen en meegeven aan de get hero om op die manier de juiste hero te get'ten
      ngOnInit(): void {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id'))) // route parameter value is converted to a number with the JavaScript (+) operator.
          .subscribe(hero => this.hero = hero);
      }



      //methode aanmaken voor een terugknop - hetzelde als op de terugknop in een browser.
      goBack(): void {
        this.location.back();
      }

      save(): void { // om aanpassingen op te slaan.
        this.heroService.update(this.hero)
          .then(() => this.goBack());
      }


}
