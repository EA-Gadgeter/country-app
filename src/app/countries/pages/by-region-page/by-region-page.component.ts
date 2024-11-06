import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public SearchByRegion(searchTerm: string) {
    this.countriesService.SearchByRegion(searchTerm)
      .subscribe(countries => this.countries = countries)
  }
}
