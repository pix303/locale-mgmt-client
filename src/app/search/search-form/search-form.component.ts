import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchCriteria } from '../../model/search-criteria.model';
import { LocaleitemService } from '../../service/localeitem.service';
import { Bundle } from '../../model/bundle.model';
import { Lang } from '../../model/lang.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  bundles: Bundle[];
  langs: Lang[];
  searchCriteria: SearchCriteria = new SearchCriteria();

  @ViewChild('searchForm')
  sForm: NgForm;

  constructor(private localeService: LocaleitemService, private router: Router) { }


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
        this.sForm.form.patchValue( { lang: this.langs[0].key } );
      }
    )

    this.localeService.fetchInitData();
  }

  onSetSearchCriteria(){
    const formValuesMap = this.sForm.value;
    this.searchCriteria.bundle = formValuesMap.bundle;
    this.searchCriteria.lang = formValuesMap.lang;
    this.searchCriteria.content = formValuesMap.content;

    //let url := "localeitems/" + 


    //this.router.navigateByUrl("")
  }

}
