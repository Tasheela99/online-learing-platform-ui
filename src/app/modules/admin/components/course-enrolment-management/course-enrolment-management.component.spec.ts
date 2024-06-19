import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrolmentManagementComponent } from './course-enrolment-management.component';

describe('CourseEnrolmentManagementComponent', () => {
  let component: CourseEnrolmentManagementComponent;
  let fixture: ComponentFixture<CourseEnrolmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseEnrolmentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEnrolmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
