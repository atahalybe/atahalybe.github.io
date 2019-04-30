import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Title } from '../../../../../node_modules/@angular/platform-browser';
import { Router } from '../../../../../node_modules/@angular/router';
import { EmailPasswordCredentials } from '../../../models/auth-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Error = null;
  loader = null;
  user = new EmailPasswordCredentials();
  constructor(
    private titleService: Title, public auth: AuthService, private router: Router, public userService: UserService) {
    this.titleService.setTitle("Login - Beauty Soul");
  }

  ngOnInit() {
  }

  login() {
    this.loader = null;
    this.auth.emailLogin(this.user).catch(m => {
      this.loader = true;
      this.Error = m;
    }).then((m: firebase.auth.UserCredential) => {
      if (m.user.emailVerified) {
        // localStorage.setItem("flag", this.user.password);
        let returnURL = localStorage.getItem('returnURL')
        if (returnURL !== "null") {
          try {
            this.router.navigateByUrl(returnURL);
            localStorage.removeItem('returnURL');
          } catch (error) {
            localStorage.removeItem('returnURL');
            this.auth.redirectRoleWise();
          }
        } else {
          debugger;
          this.auth.redirectRoleWise();
        }
      }else{
        this.auth.logout().then(m=>{ 
          this.loader = true;
          alert("Verify your email. Verification email send to your Provided email.");
        })
      }
    });

  }

}
