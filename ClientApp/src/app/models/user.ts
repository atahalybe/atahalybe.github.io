import * as firebase from 'firebase';
export class User {
    id:string;
    uid:string;
    email:string;
    emailVerified:boolean;
    phoneNumber:string;
    displayName:string;
    photoURL:string;
    path:string;
    password:string;
    isAdmin:boolean;

}
