import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConferenceReaderService } from '../service/conferencereader.service';
import { Conference } from '../models/conference.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../models/profile.model';
import { ActivatedRoute } from '@angular/router';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule], // Add NgbModule here
  styles: [`
    ngb-progressbar {
      margin-top: 5rem;
    }
    .conference-card {
      margin-bottom: 30px;
      transition: transform 0.3s ease;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      .card-img-top {
        height: 200px;
        object-fit: cover;
      }
    }
    .ai-tools-list {
      list-style: none;
      padding-left: 0;
    }
  `]
})
export class ComponentsComponent implements OnInit {
  error: string | null = null;


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

  // Existing properties
  page = 4;
  page1 = 5;
  focus;
  focus1;
  focus2;
  date: {year: number, month: number};
  model: NgbDateStruct;

  // Conference properties (similar to first app)
  conferences: Conference[] = [];
  isLoading = true;

  constructor(
    private renderer: Renderer2,
    private conferenceService: ConferenceReaderService,
    private profileService: ProfileService,
    private route: ActivatedRoute

  ) {}

  // Existing methods
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }

  ngOnInit() {
    this.loadConferences();
    this.loadProfile();

  }



  // Method to load conferences from the backend
  private loadConferences(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.conferenceService.getAllConferences().subscribe({
      next: (data: Conference[]) => {
        this.conferences = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching conferences:', err);
        this.errorMessage = err.message || 'Failed to load conferences. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  trackById(index: number, conference: Conference): number {
    return conference.idConference ?? index;
  }

  getBadgeClass(category: string): string {
    switch (category) {
      case 'VIRTUAL': return 'badge-primary';
      case 'PRESENTIEL': return 'badge-success';
      case 'HYBRID': return 'badge-info';
      default: return 'badge-secondary';
    }
  }



  // Removed AuthService dependency



  loadProfile() {
    this.route.params.subscribe(params => {
        let id = params['id'];
        id = 1;
        if (id) {
            this.profileService.getProfile(+id).subscribe({
                next: (profile) => {
                    console.log("test",profile);
                    
                    this.profile = profile;
                    this.profile.id = 1;
                    this.loading = false;
                },
                error: (err) => {
                    this.error = 'Failed to load profile';
                    this.loading = false;
                    console.error(err);
                }
            });
        } else {
            this.error = 'No profile ID provided';
            this.loading = false;
        }
    });
}
}