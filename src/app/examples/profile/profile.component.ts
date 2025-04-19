import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../models/profile.model';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, NgbModule],
})
export class ProfileComponent implements OnInit {
    profile: Profile | null = null;
    loading = true;
    error: string | null = null;

    constructor(
        private profileService: ProfileService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.profileService.getProfile(+id).subscribe({
                    next: (profile) => {
                        this.profile = profile;
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