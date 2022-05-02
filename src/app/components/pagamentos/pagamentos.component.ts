import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Ipagamento } from 'src/app/models/pagamento.interface';
import { PagamentoService } from 'src/app/services/pagamento/pagamento.service';
import { ModaalComponent } from 'src/app/shared/modaal/modaal.component';
import { ModalAddPagamentoComponent } from 'src/app/shared/modal-add-pagamento/modal-add-pagamento.component';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss']
})

export class PagamentosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: MatTableDataSource<Ipagamento>;
  pagamentos: Ipagamento[];
  textoPesquisa: string;

  constructor(
    public dialog: MatDialog,
    private pagamentoService: PagamentoService
  ) { }

  ngOnInit() {
    this.buscarPagamentos();
  }

  excluir(id: number) {
    const dado = this.pagamentos.find(e => e.id === id);

    const dialogRef = this.dialog.open(ModaalComponent, {
      width: '250px',
      data: {
        usuario: dado.username,
        data: dado.date,
        valor: dado.value
      }
    });

    const subscribeDialog = dialogRef.componentInstance.confirmarEmitter.subscribe((data) => {
      this.pagamentoService.deletar(dado).subscribe(
        () => {
          alert('deletado com sucesso');
          this.atualizarTabela();
          dialogRef.close();
        },
        (error) => {
          alert(`erro: ${error}`);
        }
      );
    });

    dialogRef.afterClosed().subscribe(() => {
      subscribeDialog.unsubscribe();
    });
  }

  adicionarPagamento() {
    const dialogRef = this.dialog.open(ModalAddPagamentoComponent, {
      width: '77.2rem',
      height: '39.5rem'
    });

    const subscribeDialog = dialogRef.componentInstance.confirmarEmitter.subscribe((data) => {

      this.pagamentoService.criar(data).subscribe(result => {
        alert('Salvo com sucesso');
        this.atualizarTabela();
        dialogRef.close();
      },
        (error) => {
          alert(`erro: ${error}`);
        });

    });

    dialogRef.afterClosed().subscribe(() => {
      subscribeDialog.unsubscribe();
    });
  }

  editar(id: number) {
    const dado = Object.assign({}, this.pagamentos.find(e => e.id === id));
    const dialogRef = this.dialog.open(ModalAddPagamentoComponent, {
      width: '77.2rem',
      height: '39.5rem',
      data: dado
    });

    const subscribeDialog = dialogRef.componentInstance.confirmarEmitter.subscribe((data) => {
      this.pagamentoService.atualizar(data).subscribe(result => {
        alert('Atualizado com sucesso');
        this.atualizarTabela();
        dialogRef.close();
      },
        (error) => {
          alert(`erro: ${error}`);
        });
    });

    dialogRef.afterClosed().subscribe(() => {
      subscribeDialog.unsubscribe();
    });
  }

  buscarPagamentos() {
    this.pagamentoService.obterTodos().subscribe(
      (pagamentos) => {
        this.pagamentos = pagamentos;
        this.dataSource = new MatTableDataSource(this.pagamentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        alert(`erro: ${error}`);
      }
    );
  }

  filtrar(e: Event) {
    const textoPesquisa = (e.target as HTMLInputElement).value;
    this.dataSource.filter = textoPesquisa.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatarMoeda(value: number) {
    const newValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return newValue;
  }

  atualizarTabela() {
    this.dataSource.filter = '';
    this.textoPesquisa = '';
    this.buscarPagamentos();
  }

  getDisplayedColumns(): string[] {
    return ['name', 'title', 'date', 'value', 'isPayed', 'actions'];
  }

}
