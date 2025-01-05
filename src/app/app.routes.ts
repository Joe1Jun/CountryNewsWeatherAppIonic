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
    path: 'weather/:country/:countryCode/:capital',
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
    path: 'header2',
    loadComponent: () => import('./shared/header2/header2.page').then( m => m.Header2Page)
  },
  {
    path: 'news-favourites',
    loadComponent: () => import('./news-favourites/news-favourites.page').then( m => m.NewsFavouritesPage)
  },
  
  
   
];
