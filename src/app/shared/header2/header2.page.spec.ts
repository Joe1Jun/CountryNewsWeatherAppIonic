import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header2Page } from './header2.page';

describe('Header2Page', () => {
  let component: Header2Page;
  let fixture: ComponentFixture<Header2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Header2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
