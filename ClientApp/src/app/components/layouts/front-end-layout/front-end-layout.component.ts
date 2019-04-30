import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { Title } from '../../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-front-end-layout',
  templateUrl: './front-end-layout.component.html',
  styleUrls: ['./front-end-layout.component.css']
})
export class FrontEndLayoutComponent implements OnInit {
  isNavShow=false;
  
  user:User = null;
  constructor(private auth: AuthService,
    private userService: UserService,private router: Router, private titleService: Title) { 
      this.titleService.setTitle("Beauty Soul");
    }

  ngOnInit() {
    this.getUser();
  }
  getUser(){
    this.auth.user$.subscribe(m => {
      if (m) {
        this.userService.get(m.uid).subscribe((u:User) => {
          if (u) {
            this.user=new User();
            this.user = u;
            this.user.email = m.email;
            this.user.emailVerified = m.emailVerified;
            this.user.displayName = m.displayName;
            this.user.photoURL = m.photoURL;

            this.userService.update(this.user);

          }
        })
      }
    })
  }
  logout() {
    this.auth.logout().then(m => {
      localStorage.removeItem("flag");
      this.router.navigateByUrl('/login');
      this.getUser();
    })
  }

}
