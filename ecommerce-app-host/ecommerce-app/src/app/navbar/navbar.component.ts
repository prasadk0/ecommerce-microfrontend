import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { NAVBAR_FALLBACK } from '../app.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  isMenuOpen = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.isMenuOpen = false;
    this.authService.logout();
    this.cdr.markForCheck();
    this.router.navigate(['/login']);
  }

  revampFallback() {
    return NAVBAR_FALLBACK;
  }
}