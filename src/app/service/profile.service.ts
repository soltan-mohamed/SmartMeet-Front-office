import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:9091/pidev/api/profiles'; // Updated endpoint

  constructor(private http: HttpClient) { }

  // Changed to get by profile ID instead of user ID
  getProfile(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }




  createProfile(profile: Profile, profilePic?: File, coverPic?: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('profile', new Blob([JSON.stringify(profile)], {
      type: 'application/json'
    }));

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    if (coverPic) {
      formData.append('coverPic', coverPic);
    }

    return this.http.post<Profile>(this.apiUrl, formData);
  }

  updateProfile(id: number, profile: Profile, profilePic?: File, coverPic?: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('profile', new Blob([JSON.stringify(profile)], {
      type: 'application/json'
    }));

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    if (coverPic) {
      formData.append('coverPic', coverPic);
    }

    return this.http.put<Profile>(`${this.apiUrl}/${id}`, formData);
  }

  getProfileImageUrl(imageUrl: string): string {
    return `${this.apiUrl}/images/${imageUrl}`;
  }
}