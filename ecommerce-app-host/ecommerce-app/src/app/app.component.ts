import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSubscription =
      this.authService.isLoggedIn$
        .subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
          this.cdr.markForCheck();
        });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
