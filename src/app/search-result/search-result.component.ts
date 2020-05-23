import { Component, OnInit } from '@angular/core';
import { LocaleItem } from '../model/locale-item.model';
import { LocaleitemService } from '../service/localeitem.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  localeItems: LocaleItem[]
  constructor( private localeService: LocaleitemService) { }

  ngOnInit() {
    this.localeService.localeItemsResult$.subscribe(
      (items) => this.localeItems = items,
      (err) => console.log(err)
    );
  }

}
