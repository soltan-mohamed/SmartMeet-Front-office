import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<Profile | null> {
  
  constructor(private profileService: ProfileService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile | null> {
    const id = Number(route.paramMap.get('id'));
    
    if (isNaN(id)) {
      return of(null); // Return null if ID is invalid
    }

    return this.profileService.getProfile(id).pipe(
      catchError(() => {
        return of(null); // Return null if there's an error
      })
    );
  }
}