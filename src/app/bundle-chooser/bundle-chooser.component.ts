import { Component, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { LocaleitemService } from '../service/localeitem.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-bundle-chooser',
  templateUrl: './bundle-chooser.component.html',
  styleUrls: ['./bundle-chooser.component.css','../app.component.css']
})
export class BundleChooserComponent implements OnInit {

  bundles: Bundle[] = [];
  bundleControl: FormControl = new FormControl();
  constructor( private localeService:LocaleitemService) { }

  ngOnInit(): void {
    this.localeService.bundles$.subscribe(
      (values)  => this.bundles = values,
      (err)     => console.error(err)
    );

    this.localeService.fetchInitData();

    this.bundleControl.valueChanges.subscribe(
      (value) => {
          this.localeService.setCurrentBundle( value );
      }
    );
  }
}
