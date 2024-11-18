import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private ApiUrl = 'http://localhost:8081/marvel';

  //Falta Inyectra el AppRouter
  constructor(private httpClient: HttpClient) {}

  getCharactersList(): Observable<any> {
    return this.httpClient.get(`${this.ApiUrl}/api/characters`).pipe();
  }

  getCharacterById(characterId: number): Observable<any> {
    return this.httpClient.get(`${this.ApiUrl}/api/characters/${characterId}`).pipe();
  }

  getSeriesById(seriesId: number): Observable<any> {
    return this.httpClient.get(`${this.ApiUrl}/api/series/${seriesId}`).pipe();
  }
}
