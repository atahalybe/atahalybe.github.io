import { NgModule } from "../../node_modules/@angular/core";
import { RouterModule, Routes } from "../../node_modules/@angular/router";
import { FrontEndLayoutComponent } from './components/layouts/front-end-layout/front-end-layout.component';
import { HomeComponent } from './components/frontEnd/home/home.component';
import { AboutusComponent } from './components/frontEnd/aboutus/aboutus.component';
import { ServicesComponent } from './components/frontEnd/services/services.component';
import { GalleryComponent } from './components/frontEnd/gallery/gallery.component';
import { ContactComponent } from './components/frontEnd/contact/contact.component';
import { LoginComponent } from './components/frontEnd/login/login.component';
import { SignupComponent } from './components/frontEnd/signup/signup.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AdminIndexComponent } from './components/admin/admin-index/admin-index.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { ServicesAdminListComponent } from './components/admin/servicesAdmin/services-admin-list/services-admin-list.component';
import { ServicesAdminManageComponent } from './components/admin/servicesAdmin/services-admin-manage/services-admin-manage.component';
import { AuthAnonymousGuard } from './services/authguards/auth-anonymous.guard';
import { AuthAdminGuard } from './services/authguards/auth-admin.guard';

const routes: Routes = [
    {
        path: '', component: FrontEndLayoutComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'about-us', component: AboutusComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'login', component: LoginComponent, canActivate: [AuthAnonymousGuard] },
            { path: 'signup', component: SignupComponent , canActivate: [AuthAnonymousGuard]},

        ]
    },
    {
        path: 'admin', component: AdminLayoutComponent, canActivate:[AuthAdminGuard], children: [
            { path: '', component: AdminIndexComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'service-category', component: CategoriesAdminComponent },
            { path: 'services', component: ServicesAdminListComponent },
            { path: 'service/add', component: ServicesAdminManageComponent },
            { path: 'service/edit/:id', component: ServicesAdminManageComponent },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }