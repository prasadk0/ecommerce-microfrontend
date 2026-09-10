import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

// const routes: Routes = [
//   {
//     path: 'products',

//     loadChildren: () =>
//       loadRemoteModule({
//         type: 'module',
//         remoteEntry: 'http://localhost:4201/remoteEntry.js',
//         exposedModule: './ProductsModule'
//       }).then(m => m.ProductsModule),
//     canActivate: [authGuard]
//   }
//   ,
//   {
//     path: 'orders',
//     loadChildren: () =>
//       loadRemoteModule({
//         type: 'module',
//         remoteEntry: 'http://localhost:4201/remoteEntry.js',
//         exposedModule: './OrdersModule'
//       }).then(m => m.OrdersModule),
//     canActivate: [authGuard]
//   },
//   {
//     path: 'notification',
//     loadChildren: () =>
//       loadRemoteModule({
//         type: 'module',
//         remoteEntry: 'http://localhost:4201/remoteEntry.js',
//         exposedModule: './NotificationModule'
//       }).then(m => m.NotificationModule),
//     canActivate: [authGuard]
//   },
//   {
//     path: '',
//     component: HomeComponent,
//     canActivate: [authGuard]
//   }
//   ,
//   {
//     path: 'signup',
//     component: SignupComponent
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'profile',
//     component: ProfileComponent,
//     canActivate: [authGuard]
//   },
//   {
//     path: 'welcome',
//     component: WelcomePageComponent
//   },
// ];

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://ecommerce-microfrontend-1.onrender.com/remoteEntry.js',
        exposedModule: './ProductsModule'
      }).then(m => m.ProductsModule),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://ecommerce-microfrontend-1.onrender.com/remoteEntry.js',
        exposedModule: './OrdersModule'
      }).then(m => m.OrdersModule),
    canActivate: [authGuard]
  },
  {
    path: 'notification',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://ecommerce-microfrontend-1.onrender.com/remoteEntry.js',
        exposedModule: './NotificationModule'
      }).then(m => m.NotificationModule),
    canActivate: [authGuard]
  },

  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
   {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }