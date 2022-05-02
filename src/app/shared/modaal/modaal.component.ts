import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  usuario: string;
  data: Date;
  valor: number;
}

@Component({
  selector: 'app-modaal',
  templateUrl: './modaal.component.html',
  styleUrls: ['./modaal.component.scss']
})
export class ModaalComponent implements OnInit {
  @Output() confirmarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ModaalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

  salvar() {
    this.confirmarEmitter.emit(true);
  }
}
