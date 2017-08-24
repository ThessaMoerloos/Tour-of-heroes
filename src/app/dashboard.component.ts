import { Component, OnInit } from '@angular/core';
// we gaan de heroService gebruiken om heroes in te laden (data)
// daarvoor moeten we deze weer importeren/injecteren
import { Hero } from './hero'; // ook hero want deze wordt gebruikt in de heroservice
import { HeroService } from './hero.service';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html', // linkt naar het bestand DashboardComponent.html
  styleUrls: [ './dashboard.component.css' ]
})


export class DashboardComponent implements OnInit{

  heroes: Hero[] = []; // een lege array voorzien om de heroes in te steken = array genaamd 'heroes'

// implenteren van service
  constructor(private heroService: HeroService) { }


  ngOnInit(): void {
   this.heroService.getHeroes()
                   .then(heroes => this.heroes = heroes.slice(0, 4)); //zelfde lijn als in heroes.component enkel met een splice
 }

}
