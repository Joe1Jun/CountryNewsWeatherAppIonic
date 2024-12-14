import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherFavouritesPage } from './weather-favourites.page';

describe('WeatherFavouritesPage', () => {
  let component: WeatherFavouritesPage;
  let fixture: ComponentFixture<WeatherFavouritesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFavouritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
