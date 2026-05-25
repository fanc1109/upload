import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arquivo } from './arquivo';

describe('Arquivo', () => {
  let component: Arquivo;
  let fixture: ComponentFixture<Arquivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arquivo],
    }).compileComponents();

    fixture = TestBed.createComponent(Arquivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
