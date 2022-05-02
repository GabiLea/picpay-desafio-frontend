import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  dadosUsuario: Usuario;
  formulario = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.dadosUsuario = new Usuario();
  }

  entrar() {
    this.usuarioService.buscar(this.dadosUsuario).subscribe(
      (response) => {
        if (response[0]?.email) {
          this.router.navigate(['pagamentos']);
        } else {
          alert('usuario ou senha incorretos');
        }
      },
      (error) => {
        alert(`erro: ${error}`);
      }
    );
  }

}
