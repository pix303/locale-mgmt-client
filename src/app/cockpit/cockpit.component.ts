import { Component, OnInit, ViewChild } from '@angular/core';
import { LocaleitemService } from '../service/localeitem.service';
import { Bundle } from '../model/bundle.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  public currentBundle: Bundle;
  constructor( 
    private localeService:LocaleitemService,
    public authService:AuthService,
    private route:Router) {}

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
