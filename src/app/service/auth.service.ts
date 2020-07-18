import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$:Subject<{name:""}> = new Subject<{name:""}>();
  loggedIn:boolean = false;
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  constructor( private httpClient:HttpClient, private coockieService:CookieService, private router:Router ){
    this.httpClient.get("info").subscribe(
      (value) => {
        if (value["user"] != undefined){
          this.loggedIn = true;
          this.loggedIn$.next(true);
          this.currentUser$.next(value["user"]);
        }
      },
      (err) => {
        this.loggedIn = false;
        this.loggedIn$.next(false)
        this.currentUser$.next({name:""});
      }
    );
  }

  logout(){
    this.coockieService.delete("auth-session");
    window.location.href = "/logout";
  }

}
