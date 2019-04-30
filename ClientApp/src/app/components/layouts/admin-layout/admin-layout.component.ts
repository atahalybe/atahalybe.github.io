import { Component, OnInit } from '@angular/core';
import { navItems } from './../../../_nav';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Title } from '../../../../../node_modules/@angular/platform-browser';
import { Router } from '../../../../../node_modules/@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  user = new User();
  notificationUnseenCount = 0;
  isMobile: boolean;
  constructor(private auth: AuthService,
    private titleService: Title,
    private router: Router, private userService: UserService,) {
      this.titleService.setTitle("Admin - Beauty Soul");
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
    auth.user$.subscribe(m => {
      if (m) {
        userService.get(m.uid).subscribe((u:User) => {
          if (u) {
            this.user = u;
            this.user.email = m.email;
            this.user.emailVerified = m.emailVerified;
            this.user.displayName = m.displayName;
            this.user.photoURL = m.photoURL;

            userService.update(this.user);

          }
        })
      }
    })
  }

  ngOnInit() {
  }
  
  logout() {
    this.auth.logout().then(m => {
      localStorage.removeItem("flag");
      this.router.navigateByUrl('/login');
    })
  }

}
