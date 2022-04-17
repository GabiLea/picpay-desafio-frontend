import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss']
})
export class ModalPaymentComponent {

  formValue: object = {}

  @Input()
  title: string = 'Adicionar pagamento'

  @Input()
  disabled: boolean = true

  @Output() callback = new EventEmitter<any>();

  onClose(){
    this.callback.emit()
  }

  onKeyUp(value){
    this.formValue = {...this.formValue, ...value}
  }

  onSubmit(event){
    event.preventDefault()
    this.onClose()
    this.callback.emit(this.formValue)
  }

}