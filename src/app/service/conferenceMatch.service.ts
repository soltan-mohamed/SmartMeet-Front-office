import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface MatchResponse {
  success: boolean;
  matches?: any[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConferenceMatchService {
  private apiUrl = 'http://localhost:5000/match-conferences';

  constructor(private http: HttpClient) {}

  getMatchingConferences(profile: any, conferences: any[]): Observable<MatchResponse> {
    return this.http.post<MatchResponse>(this.apiUrl, {
      profile: profile,
      conferences: conferences
    }).pipe(
      catchError(error => {
        console.error('Matching error:', error);
        throw error;
      })
    );
  }
}