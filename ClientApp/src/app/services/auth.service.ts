import { UserService } from './user.service';
import { EmailPasswordCredentials } from '../models/auth-model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private afu: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afu.authState
  }
  getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.afu.authState.subscribe(u => {
        if (u) {
          this.userService.get(u.uid).subscribe((users:User) => {
            resolve(users);
            return;
          })
        }else{
          reject("User not found")
        }
      })
    })

  }
  loginGoogle() {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    this.afu.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }//
  loginFacebook() {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    this.afu.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }
  logintwitter() {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    this.afu.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
  }
  emailSignUp(credentials): any {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    return this.afu.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
  emailSignUpwithData(credentials): any {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    return this.afu.auth.createUserAndRetrieveDataWithEmailAndPassword(credentials.email, credentials.password);
  }

  emailLogin(credentials: EmailPasswordCredentials) {
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL');
    localStorage.setItem('returnURL', returnURL);
    return this.afu.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }
  resetPassword(email: string) {
    return this.afu.auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  logout() {
    return this.afu.auth.signOut();
  }
  get currentUserObservable(): any {
    return this.afu.auth;
  }
  redirectRoleWise(){
    this.getCurrentUser().then(u => {   
      if(u.isAdmin){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/']);
      }
    })
    
  }
}
