import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { Router } from '@angular/router';
import { PROFILE_FALLBACK } from '../app.constant';

interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  memberSince: string;
  location: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  isEditing = false;

  profile: Profile = {
    name: 'Admin',
    email: 'admin@example.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    memberSince: 'January 2026',
    location: 'Pune, Maharashtra'
  };

  private originalProfile: Profile = { ...this.profile };


  constructor(
    private router: Router
  ) {}


  revampFallback() {
    return PROFILE_FALLBACK;
  }


  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.originalProfile = { ...this.profile };
    }
  }


  saveProfile(): void {

    // Keep a copy for cancel functionality
    this.originalProfile = { ...this.profile };

    this.isEditing = false;

    // Later you can call Spring Boot API here
    //
    // this.profileService.updateProfile(this.profile)
    //   .subscribe({
    //     next: () => {
    //       this.isEditing = false;
    //     }
    //   });
  }


  cancelEdit(): void {

    this.profile = {
      ...this.originalProfile
    };

    this.isEditing = false;
  }


  changePassword(): void {
    this.router.navigate(['/change-password']);
  }
}
