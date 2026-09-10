import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { Router } from '@angular/router';

import { PROFILE_FALLBACK } from '../app.constant';
import constantsJson from '../../assets/app-fallback.json';

import { deepMerge } from 'src/app/utils/deep-merge';


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

  readonly constants = deepMerge(
    PROFILE_FALLBACK,
    constantsJson.PROFILE_FALLBACK
  );

  isEditing = false;


  profile: Profile = {
    name: 'Admin',
    email: 'admin@example.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    memberSince: 'January 2026',
    location: 'Pune, Maharashtra'
  };


  private originalProfile: Profile = {
    ...this.profile
  };


  constructor(
    private readonly router: Router
  ) {}


  revampFallback() {
    return this.constants;
  }


  toggleEdit(): void {

    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.originalProfile = {
        ...this.profile
      };
    }
  }


  saveProfile(): void {

    this.originalProfile = {
      ...this.profile
    };

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
    this.router.navigate([
      '/change-password'
    ]);
  }
}