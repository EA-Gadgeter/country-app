import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  public SearchByCapital(searchTerm: string) {
    this.countriesService.SearchByCountry(searchTerm)
      .subscribe(countries => this.countries = countries)
  }
}
