import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaEdicionComponent } from './analitica-edicion.component';

describe('AnaliticaEdicionComponent', () => {
  let component: AnaliticaEdicionComponent;
  let fixture: ComponentFixture<AnaliticaEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliticaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
