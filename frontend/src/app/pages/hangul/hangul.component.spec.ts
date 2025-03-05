import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangulComponent } from './hangul.component';

describe('HangulComponent', () => {
  let component: HangulComponent;
  let fixture: ComponentFixture<HangulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
