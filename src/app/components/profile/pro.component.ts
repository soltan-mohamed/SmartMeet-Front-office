import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../models/profile.model';
import { RouterModule } from '@angular/router';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pro',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
})
export class ProComponent implements OnInit {
  profile: Profile = {
    username: '',
    position: '',
    interests: '',
    description: ''
    // Removed userId initialization
  };
  
  isEditing = false;
  profilePicFile?: File;
  coverPicFile?: File;
  profilePicPreview?: string;
  coverPicPreview?: string;
  loading = false;
  errorMessage = '';

  // Removed AuthService dependency
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    // Hardcoded profile ID for example - replace with your logic to get profile ID
    const profileId = 1; 
    this.profileService.getProfile(profileId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePicFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCoverPicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.coverPicFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPicPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  startEditing(): void {
    this.isEditing = true;
    if (this.profile.profilePictureUrl) {
      this.profilePicPreview = this.profileService.getProfileImageUrl(this.profile.profilePictureUrl);
    }
    if (this.profile.coverPictureUrl) {
      this.coverPicPreview = this.profileService.getProfileImageUrl(this.profile.coverPictureUrl);
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.profilePicFile = undefined;
    this.coverPicFile = undefined;
    this.profilePicPreview = undefined;
    this.coverPicPreview = undefined;
  }

  saveProfile(): void {
    this.loading = true;
    
    const operation = this.profile.id 
      ? this.profileService.updateProfile(this.profile.id, this.profile, this.profilePicFile, this.coverPicFile)
      : this.profileService.createProfile(this.profile, this.profilePicFile, this.coverPicFile);

    operation.subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isEditing = false;
        this.loading = false;
        this.profilePicFile = undefined;
        this.coverPicFile = undefined;
      },
      error: (err) => {
        this.errorMessage = 'Failed to save profile';
        this.loading = false;
      }
    });
  }

  getProfileImageUrl(imageUrl: string): string {
    return this.profileService.getProfileImageUrl(imageUrl);
  }
}