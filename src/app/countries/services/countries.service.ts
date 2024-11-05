import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import type { Country } from "../interfaces/country.interface";

@Injectable({ providedIn: "root" })
export class CountriesService {
  private API_URL = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) {}

  public SearchByCapital(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/capital/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }
}
