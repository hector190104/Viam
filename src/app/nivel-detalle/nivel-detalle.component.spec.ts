import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelDetalleComponent } from './nivel-detalle.component';

describe('NivelDetalleComponent', () => {
  let component: NivelDetalleComponent;
  let fixture: ComponentFixture<NivelDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NivelDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
