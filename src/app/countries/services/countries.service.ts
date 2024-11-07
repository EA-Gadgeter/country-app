import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { map, delay } from "rxjs/operators";

import type { Country } from "../interfaces/country.interface";

@Injectable({ providedIn: "root" })
export class CountriesService {
  private API_URL = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) {}

  private GetCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
        catchError(() => of([])),
        delay(2000)
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
    return this.GetCountriesRequest(url);
  }

  public SearchByCountry(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/name/${term}`;
    return this.GetCountriesRequest(url);
  }

  public SearchByRegion(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/region/${term}`;
    return this.GetCountriesRequest(url);
  }
}
