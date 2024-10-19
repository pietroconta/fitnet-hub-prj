import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideScreenPage } from './slide-screen.page';

describe('SlideScreenPage', () => {
  let component: SlideScreenPage;
  let fixture: ComponentFixture<SlideScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SlideScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
