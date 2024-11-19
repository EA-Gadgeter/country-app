import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public SearchByCapital(searchTerm: string) {
    this.isLoading = true;

    this.countriesService.SearchByCapital(searchTerm)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
