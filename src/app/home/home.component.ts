import { Component, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { LocaleitemService } from '../service/localeitem.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../app.component.css']
})
export class HomeComponent implements OnInit {

  userName: string = "";
  isLoggedIn: boolean = false;

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getUser$().subscribe(
      (value) => console.log(value),
      (err) => console.error(err)
    );

    this.isLoggedIn = false;
    this.authService.loggedIn$.subscribe(
      (value) => {
        if (value){
          // this.authService.getUser$().subscribe(
          //   (value) => {
          //     console.log(value)
          //     this.userName = value.name
          //   }
          // );

          this.isLoggedIn = true;
        }
      },
      (err) => console.error(err)
    );

  }

}
