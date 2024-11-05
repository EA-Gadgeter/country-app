import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public SearchByCapital(searchTerm: string) {
    this.countriesService.SearchByCapital(searchTerm)
      .subscribe(countries => this.countries = countries)
  }
}
