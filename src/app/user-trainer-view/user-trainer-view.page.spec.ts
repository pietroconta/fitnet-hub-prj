import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTrainerViewPage } from './user-trainer-view.page';

describe('UserTrainerViewPage', () => {
  let component: UserTrainerViewPage;
  let fixture: ComponentFixture<UserTrainerViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserTrainerViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
