import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { take, map, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private userService: UserService, public snackBar: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRole();

  }
  checkRole() {
    let authS = this.auth;
    let userS = this.userService;
    return new Promise<boolean>((resolve) => {
      authS.getCurrentUser().then(user => {
        resolve(user.isAdmin);
        if (!user.isAdmin) {
          this.auth.redirectRoleWise();
          // this.snackBar.open("Access Denied", "", { duration: 3000 });
        }
      });
    })
  }
}
