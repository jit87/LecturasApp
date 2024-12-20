import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoLibroComponent } from './estado-libro.component';

describe('EstadoLibroComponent', () => {
  let component: EstadoLibroComponent;
  let fixture: ComponentFixture<EstadoLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
