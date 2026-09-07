import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { Router } from '@angular/router';
import { NAVBAR_FALLBACK } from '../app.constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.isMenuOpen = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  revampFallback() {
    return NAVBAR_FALLBACK;
  }
}