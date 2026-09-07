import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  showWelcomeDialog = false;

  welcomeSlides = [
    {
      title: 'Welcome to Your Dashboard',
      description:
        'Manage your products, orders and customers from one simple dashboard.',
      icon: 'pi pi-home'
    },
    {
      title: 'Manage Your Products',
      description:
        'Add new products, update product information and keep track of your inventory.',
      icon: 'pi pi-box'
    },
    {
      title: 'Track Your Orders',
      description:
        'Monitor your latest orders and stay updated with their current status.',
      icon: 'pi pi-shopping-cart'
    },
    {
      title: 'You’re All Set!',
      description:
        'Everything is ready. Start exploring your dashboard and manage your store.',
      icon: 'pi pi-check-circle'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showWelcomeDialog = true;
  }

  closeWelcomeDialog(): void {
    this.showWelcomeDialog = false;

    this.router.navigate(['/']);
  }
}