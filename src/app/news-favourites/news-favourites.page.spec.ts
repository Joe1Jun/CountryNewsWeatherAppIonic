import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsFavouritesPage } from './news-favourites.page';

describe('NewsFavouritesPage', () => {
  let component: NewsFavouritesPage;
  let fixture: ComponentFixture<NewsFavouritesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFavouritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
