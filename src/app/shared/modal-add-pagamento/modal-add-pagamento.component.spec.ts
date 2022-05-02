import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPagamentoComponent } from './modal-add-pagamento.component';

describe('ModalAddPagamentoComponent', () => {
  let component: ModalAddPagamentoComponent;
  let fixture: ComponentFixture<ModalAddPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
