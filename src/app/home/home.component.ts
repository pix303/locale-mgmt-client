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

  currentUser = {name:""};
  isLoggedIn: boolean = false;

  constructor( private authService:AuthService ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (value) => this.currentUser = value
    );
  }

}
