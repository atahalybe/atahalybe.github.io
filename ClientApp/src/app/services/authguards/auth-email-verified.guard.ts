import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { take, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthEmailVerifiedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router,public snackBar: MatSnackBar) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if (!user.emailVerified) {
          this.auth.logout().then(m => {
            this.router.navigate(['/login']);  
            this.snackBar.open("Verify your email. Verification email send to your Provided email.", "", { duration: 5000 });
            
          })
        }
        return user.emailVerified;
      })
    );

  }
}
