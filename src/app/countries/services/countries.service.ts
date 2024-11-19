import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import type { Country } from "../interfaces/country.interface";
import type { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: "root" })
export class CountriesService {
  private API_URL = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {
    byCapital: { term: "", countries: [] },
    byCountry: { term: "", countries: [] },
    byRegion: { region: "", countries: [] },
  };

  constructor(private http: HttpClient) {
    this.LoadFromLocalStorage();
  }

  private SaveToLocalStorage () {
    localStorage.setItem("cacheStore", JSON.stringify(this.cacheStore));
  }

  private LoadFromLocalStorage () {
    const rawStorage = localStorage.getItem("cacheStore");

    if (!rawStorage) return;

    this.cacheStore = JSON.parse(rawStorage);
  }

  private GetCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
        catchError(() => of([])),
        // Delay por motivos didacticos
        // delay(2000)
      );
  }

  public SearchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.API_URL}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      // Usamos un pipe para regresar null o UN SOLO país
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  public SearchByCapital(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/capital/${term}`;
    return this.GetCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term, countries }),
        tap(() => this.SaveToLocalStorage())
      )
  }

  public SearchByCountry(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/name/${term}`;
    return this.GetCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term, countries }),
        tap(() => this.SaveToLocalStorage())
      )
  }

  public SearchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.API_URL}/region/${region}`;
    return this.GetCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.SaveToLocalStorage())
      )
  }
}
