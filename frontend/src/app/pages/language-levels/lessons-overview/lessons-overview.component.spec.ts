import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsOverviewComponent } from './lessons-overview.component';

describe('LessonsOverviewComponent', () => {
  let component: LessonsOverviewComponent;
  let fixture: ComponentFixture<LessonsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
