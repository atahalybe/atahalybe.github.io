import { User } from '../models/user';
import { Injectable, Inject } from '@angular/core';
import { take ,map} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http'; 
@Injectable()
export class UserService {

  constructor(private router: Router,private http: HttpClient) { }

  add(user: User) {
    delete user.id;
    return this.http.post("/api/Users",user);
  }
  
  update(user: User) {
    var id = user.id;
    delete user.id;
    
    return this.http.post("/api/Users/"+id,user);
  }
  get(uid){
    return this.http.get("/api/Users/"+uid);    
  } 

  getAll(){
    return this.http.get("/api/Users/");
  }


}
