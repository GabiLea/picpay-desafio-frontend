import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL = 'http://localhost:3000/account';

  httpCabecalho = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  buscar(user: Usuario): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseURL, {
      ...this.httpCabecalho,
      params: { email: user.email, password: user.password },
    });
  }

}
