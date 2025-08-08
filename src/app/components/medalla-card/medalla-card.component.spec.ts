import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedallaCardComponent } from './medalla-card.component';

describe('MedallaCardComponent', () => {
  let component: MedallaCardComponent;
  let fixture: ComponentFixture<MedallaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedallaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedallaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
