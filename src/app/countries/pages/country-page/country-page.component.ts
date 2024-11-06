import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  public ngOnInit(): void {
    // Podriamos suscribirnos primero a los params, y de ahi nos
    // volvemos a suscribir para hacer la petición, pero caemos en
    // algo llamado SUSCRIBE HELL
    // Podemos usar los el pipe y el operador switchMap, que nos permite
    // transformar información pero regresando otro observable, y ahi aprovechamos para hacer la petición
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.SearchCountryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl("");
        }

        console.log("Tenemos un país")
      })
  }
}
