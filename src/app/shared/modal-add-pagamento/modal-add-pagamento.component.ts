import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ipagamento } from 'src/app/models/pagamento.interface';
import { Pagamento } from 'src/app/models/pagamento.model';
@Component({
  selector: 'app-modal-add-pagamento',
  templateUrl: './modal-add-pagamento.component.html',
  styleUrls: ['./modal-add-pagamento.component.scss']
})

export class ModalAddPagamentoComponent implements OnInit {

  @Output() confirmarEmitter: EventEmitter<Ipagamento> = new EventEmitter<Ipagamento>();

  dadosPagamento: Pagamento;
  formulario = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required, Validators.pattern('^[+-]?([1-9]\\d*|0)?(\\.\\d\{0,2\})?$')]),
    data: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ModalAddPagamentoComponent>, @Inject(MAT_DIALOG_DATA) public data: Ipagamento | null) { }

  ngOnInit() {
    this.data === null ? this.dadosPagamento = new Pagamento() : this.dadosPagamento = this.data;
  }

  cancelar() {
    this.dialogRef.close();
  }

  salvar() {
    if (this.formulario.invalid) {
      alert('formulario inválido');
      return;
    }
    this.confirmarEmitter.emit(this.dadosPagamento);
  }

}
