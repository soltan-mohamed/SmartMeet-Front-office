import { Component, OnInit } from '@angular/core';
import { ConferenceReaderService } from '../../service/conferencereader.service';
import { Conference } from '../../models/conference.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {
  conference: Conference | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private conferenceService: ConferenceReaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const conferenceId = +params['id'];
      if (conferenceId) {
        this.loadConferenceWithSessions(conferenceId);
      } else {
        this.errorMessage = 'No conference ID provided';
        this.isLoading = false;
      }
    });
  }

  loadConferenceWithSessions(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.conferenceService.getConferenceById(id).subscribe({
      next: (conference) => {
        console.log('Conference data:', conference); // Debug log
        this.conference = conference;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading conference:', err);
        this.errorMessage = 'Failed to load conference details';
        this.isLoading = false;
      }
    });
  }

  getSessionDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // in hours
    
    if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return `${minutes} min`;
    } else {
      const hours = Math.floor(duration);
      const minutes = Math.round((duration % 1) * 60);
      return `${hours}h ${minutes}min`;
    }
  }

  getSessionTimeRange(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
            ${endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }

  getCategoryClass(category: string): string {
    // Handle the typo in your API response
    return category.toLowerCase() === 'onligne' ? 'online' : 'presentiel';
  }
}