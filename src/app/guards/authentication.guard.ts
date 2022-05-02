import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    loginFlag: boolean

    constructor(private router: Router) { }

    canActivate(): boolean {
        if (this.loginFlag) {
            return true
        } else {
            this.router.navigate(['/auth'])
            return false
        }
    }
}
