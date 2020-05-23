import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchCriteria } from '../model/search-criteria.model';
import { LocaleitemService } from '../service/localeitem.service';
import { Bundle } from '../model/bundle.model';
import { Lang } from '../model/lang.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  bundles: Bundle[];
  langs: Lang[];
  searchCriteria: SearchCriteria = new SearchCriteria();

  @ViewChild('searchForm')
  sForm: NgForm;

  constructor(private localeService: LocaleitemService) { }


  ngOnInit() {
    this.localeService.bundles$.subscribe(
      (values) => {
        this.bundles = values;
        this.sForm.form.patchValue( { bundle: this.bundles[0].key } );
      }
    )
    this.localeService.langs$.subscribe(
      (values) => {
        this.langs = values;
        console.log( this.langs[0].key )
        this.sForm.form.patchValue( { lang: this.langs[0].key } );
      }
    )

    this.localeService.fetchInitData();
  }

  onSetSearchCriteria(){
    const formValuesMap =  this.sForm.value;
    this.searchCriteria.bundle = formValuesMap.bundle;
    this.searchCriteria.lang = formValuesMap.lang;
    this.searchCriteria.content = formValuesMap.content;

    this.localeService.retriveLocaleItems(this.searchCriteria);
  
  }

}
