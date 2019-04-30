import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthAnonymousGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router,private userService:UserService,public snackBar: MatSnackBar) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if(user == null) {
          return true;
        }else if(user&&!user.emailVerified){
          this.auth.logout().then(m => {
            this.router.navigate(['/login']);            
            this.snackBar.open("Verify your email. Verification email send to your provided email.", "", { duration: 5000 });
            
          })
        }
        else{     
          this.auth.redirectRoleWise();
          this.snackBar.open("You already Logged In.", "", { duration: 2000 });
        }
        // return (user == null) ? true : false;
      })
      // ,tap(loggedIn => {
      //   if (loggedIn) {
      //     alert("You already LoggedIn");
      //     this.router.navigate(['/'], { queryParams: { returnURL: state.url } });
      //   }
      // })
    );

  }
}
