import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageLevelsComponent } from './language-levels.component';

describe('LanguageLevelsComponent', () => {
  let component: LanguageLevelsComponent;
  let fixture: ComponentFixture<LanguageLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageLevelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
