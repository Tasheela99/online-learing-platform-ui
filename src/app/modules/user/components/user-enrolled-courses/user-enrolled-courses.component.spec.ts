import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrolledCoursesComponent } from './user-enrolled-courses.component';

describe('UserEnrolledCoursesComponent', () => {
  let component: UserEnrolledCoursesComponent;
  let fixture: ComponentFixture<UserEnrolledCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEnrolledCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEnrolledCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
