import { Component, OnDestroy, OnInit } from "@angular/core";
import { AccountService } from "../../_services/account.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { ButtonConfig } from "src/app/_components/button/ButtonConfig";
import { InputConfig } from "src/app/_components/input/InputConfig";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    loading = false;

    account$: Subscription;

    loginButtonConfig: ButtonConfig;

    emailInputConfig: InputConfig;
    passwordInputConfig: InputConfig;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.setupForm()        
    }

    get f() { return this.loginForm.controls; }

    setupForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginButtonConfig = {
            label: "Entrar",
            primary: true
        }

        this.emailInputConfig = {
            label: "Email",
            controlName: "email",
            type: "text"
        }
        
        this.passwordInputConfig = {
            label: "Senha",
            controlName: "password",
            type: "password"
        }
    }

    onSubmit() {
        if (this.f.email.value === "" || this.f.password.value === "") return;
        this.loading = true;
        
        this.account$ = this.accountService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                this.loading = false;
            },
            error: error => {
                console.error(error);
                this.loading = false;
            }
        });
        
    }

    ngOnDestroy() {
        if (this.account$ != null) this.account$.unsubscribe();
    }
}