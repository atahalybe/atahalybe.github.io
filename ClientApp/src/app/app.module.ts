import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';


// Import 3rd party components

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { NG_HOST_SYMBOL } from '../../node_modules/@angular/core/src/render3/instructions';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import {SlideshowModule} from 'ng-simple-slideshow';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTabsModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatTooltipModule, MatTableModule, MatSnackBarModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FrontEndLayoutComponent } from './components/layouts/front-end-layout/front-end-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '../../node_modules/@angular/common';
import { HomeComponent } from './components/frontEnd/home/home.component';
import { AboutusComponent } from './components/frontEnd/aboutus/aboutus.component';
import { ServicesComponent } from './components/frontEnd/services/services.component';
import { GalleryComponent } from './components/frontEnd/gallery/gallery.component';
import { ContactComponent } from './components/frontEnd/contact/contact.component';
import { LoginComponent } from './components/frontEnd/login/login.component';
import { SignupComponent } from './components/frontEnd/signup/signup.component';
import { AngularFireModule } from '../../node_modules/@angular/fire';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AngularFireAuthModule, AngularFireAuth } from '../../node_modules/@angular/fire/auth';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AdminIndexComponent } from './components/admin/admin-index/admin-index.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { ServicesAdminListComponent } from './components/admin/servicesAdmin/services-admin-list/services-admin-list.component';
import { ServicesAdminManageComponent } from './components/admin/servicesAdmin/services-admin-manage/services-admin-manage.component';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { DropZoneDirective } from '../directives/drop-zone.directive';
import { AuthGuard } from './services/authguards/auth.guard';
import { AuthAnonymousGuard } from './services/authguards/auth-anonymous.guard';
import { AuthAdminGuard } from './services/authguards/auth-admin.guard';
import { AuthEmailVerifiedGuard } from './services/authguards/auth-email-verified.guard';
import { AngularFireDatabaseModule } from '../../node_modules/@angular/fire/database';
import { AngularFireDatabase } from '../../node_modules/@angular/fire/database';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FrontEndLayoutComponent,
    AboutusComponent,
    ServicesComponent,
    GalleryComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    AdminLayoutComponent,
    AdminIndexComponent,
    UsersListComponent,
    CategoriesAdminComponent,
    ServicesAdminListComponent,
    ServicesAdminManageComponent,
    FileSizePipe,
    DropZoneDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    // ChartsModule,
    // SlideshowModule
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatSortModule, MatTooltipModule, MatTableModule, MatSnackBarModule, MatCheckboxModule, MatSelectModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    UserService,
    AngularFireAuth,
    AngularFireDatabase,
    AuthGuard,
    AuthAnonymousGuard,
    AuthAdminGuard,
    AuthEmailVerifiedGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
