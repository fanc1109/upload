import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosComponent } from './documentos';
import { provideHttpClient } from '@angular/common/http';

describe('DocumentosComponent', () => {
  let component: DocumentosComponent;
  let fixture: ComponentFixture<DocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosComponent],
      providers: [provideHttpClient()] // Adicionado para não dar erro de HTTP no teste
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});