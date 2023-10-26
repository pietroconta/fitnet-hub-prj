import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./trainers/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./users/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'slide-screen',
    loadChildren: () => import('./slide-screen/slide-screen.module').then( m => m.SlideScreenPageModule)
  },
  {
    path: 'user-trainer-view/:id',
    loadChildren: () => import('./user-trainer-view/user-trainer-view.module').then( m => m.UserTrainerViewPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./trainer-tabs/tabs.module').then( m => m.TabsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
