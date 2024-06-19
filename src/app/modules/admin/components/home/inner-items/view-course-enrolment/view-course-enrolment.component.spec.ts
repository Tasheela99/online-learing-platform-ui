import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseEnrolmentComponent } from './view-course-enrolment.component';

describe('ViewCourseEnrolmentComponent', () => {
  let component: ViewCourseEnrolmentComponent;
  let fixture: ComponentFixture<ViewCourseEnrolmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCourseEnrolmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
