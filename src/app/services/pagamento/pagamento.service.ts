import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ipagamento } from 'src/app/models/pagamento.interface';

@Injectable({
  providedIn: 'root',
})

export class PagamentoService {
  private baseURL = 'http://localhost:3000/tasks';

  httpCabecalho = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  obterTodos(): Observable<Ipagamento[]> {
    return this.http.get<Ipagamento[]>(this.baseURL);
  }

  obter(id: number): Observable<Ipagamento> {
    return this.http.get<Ipagamento>(`${this.baseURL}/${id}`);
  }

  atualizar(pagamento: Ipagamento): Observable<any> {
    return this.http.put(
      `${this.baseURL}/${pagamento.id}`,
      pagamento,
      this.httpCabecalho
    );
  }

  criar(pagamento: Ipagamento): Observable<any> {
    return this.http.post(`${this.baseURL}`, pagamento, this.httpCabecalho);
  }

  deletar(pagamento: Ipagamento): Observable<any> {
    return this.http.delete(`${this.baseURL}/${pagamento.id}`);
  }
}


