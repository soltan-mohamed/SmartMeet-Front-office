import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Conference } from '../models/conference.model';

@Injectable({
  providedIn: 'root'
})
export class ConferenceReaderService {
  private apiUrl = 'http://localhost:9091/pidev/api/conferences';

  constructor(private http: HttpClient) { }

  getAllConferences(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getConferenceById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllConferencesWithSessions(): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.apiUrl}/with-sessions`)
      .pipe(catchError(this.handleError));
  }

  getImageUrl(filename: string): string {
    return `${this.apiUrl}/images/${encodeURIComponent(filename)}`;
  }

  public sanitizeFileName(name: string): string {
    return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'Network error - please check your internet connection';
    } else {
      errorMessage = error.error?.message || error.message || `Server returned ${error.status}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}