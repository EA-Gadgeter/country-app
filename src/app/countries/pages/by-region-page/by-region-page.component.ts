import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';

import type { Country } from '../../interfaces/country.interface';
import type { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  public SearchByRegion(region: Region) {
    this.selectedRegion = region;

    this.countriesService.SearchByRegion(region)
      .subscribe(countries => this.countries = countries)
  }
}
