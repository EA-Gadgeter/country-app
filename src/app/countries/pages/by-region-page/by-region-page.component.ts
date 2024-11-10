import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';

import type { Country } from '../../interfaces/country.interface';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;


  constructor(private countriesService: CountriesService) {}

  public SearchByRegion(region: Region) {
    this.selectedRegion = region;

    this.countriesService.SearchByRegion(region)
      .subscribe(countries => this.countries = countries)
  }
}
