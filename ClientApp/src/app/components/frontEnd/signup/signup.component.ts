import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Title } from '../../../../../node_modules/@angular/platform-browser';
import { Router } from '../../../../../node_modules/@angular/router';
export class EmailCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Error = null;
  user = new User();
  emailCredential = new EmailCredentials();
  loader = null;
  constructor(
    private titleService: Title, public auth: AuthService, private router: Router, public userService: UserService) {
    this.titleService.setTitle("SignUp - Beauty Soul");
  }

  ngOnInit() {
  }
  signUp() {

    this.loader = null;
    this.auth.emailSignUp({ email: this.emailCredential.email, password: this.emailCredential.password }).catch(m => {
      this.Error = m;
      this.loader = true;
    }).then(m => {
      let user = new User();
      user.uid = m.user.uid;
      user.email = m.user.email;
      user.emailVerified = m.user.emailVerified;
      user.displayName = this.user.displayName;
      user.photoURL = m.user.photoURL;
      user.phoneNumber = this.user.phoneNumber;
      user.password = this.emailCredential.password;
      user.isAdmin = false;
      this.userService.add(user)
        .subscribe(u => {
          this.auth.user$.subscribe(c => {
            c.updateProfile({ displayName: this.user.displayName, photoURL: null }).then(k => {
              c.sendEmailVerification().then(g => {
                this.auth.logout().then(l => {
                  this.router.navigate(['/login']);
                  alert("Successfully SignUp. Confirmation Email send to your Email Address. Verify your email to proceed");
                })
              })
            })

          })
        })
    }).catch(c => {
      this.loader = true;
      this.Error = c;
    })
  }
}
