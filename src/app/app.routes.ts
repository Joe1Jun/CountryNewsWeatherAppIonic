import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'countries',
    loadComponent: () => import('./countries/countries.page').then( m => m.CountriesPage)
  },
  {
    path: 'countries/:searchTerm',
    loadComponent: () => import('./countries/countries.page').then( m => m.CountriesPage)
  },
  {
    path: 'news/:country/:countryCode',
    loadComponent: () => import('./news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'weather/:city',
    loadComponent: () => import('./weather/weather.page').then( m => m.WeatherPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  
  {
    path: 'header',
    loadComponent: () => import('./shared/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'footer',
    loadComponent: () => import('./shared/footer/footer.page').then( m => m.FooterPage)
  },
];
