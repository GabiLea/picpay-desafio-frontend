import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { ModaalComponent } from './modaal/modaal.component';
import { ModalAddPagamentoComponent } from './modal-add-pagamento/modal-add-pagamento.component';

@NgModule({
  declarations: [ModaalComponent, ModalAddPagamentoComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MaterialModule
  ],
  exports: [FormsModule, ReactiveFormsModule]
})
export class SharedModule { }
