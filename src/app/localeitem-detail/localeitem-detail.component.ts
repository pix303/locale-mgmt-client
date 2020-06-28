import { Component, OnInit } from '@angular/core';
import { LocaleItem } from '../model/locale-item.model';
import { LocaleitemService } from '../service/localeitem.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-localeitem-detail',
  templateUrl: './localeitem-detail.component.html',
  styleUrls: ['./localeitem-detail.component.css']
})
export class LocaleitemDetailComponent implements OnInit {

  public sameKeyLocaleitems: LocaleItem[]

  constructor( private localeItemService:LocaleitemService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.sameKeyLocaleitems = [];

    //binding detail
    this.localeItemService.localeItemsByKeyResult$.subscribe(
      (values) => this.sameKeyLocaleitems = values,
      (err) => this.sameKeyLocaleitems = []
    );

    console.log("just loaded LocaleitemDetailComponent")
    //trigger call for id
    const landingId = this.route.snapshot.params['id']
    if ( landingId != undefined ){
      this.localeItemService.retriveLocaleItemsByKey(landingId)
    }

    //binding change id when in page and trigger call
    this.route.params.subscribe(
      (params:Params) => {
        this.localeItemService.retriveLocaleItemsByKey(params['id'])
      }
    );

  }

}
