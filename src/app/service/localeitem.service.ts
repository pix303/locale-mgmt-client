import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LocaleItem } from '../model/locale-item.model';
import { SearchCriteria } from '../model/search-criteria.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bundle } from '../model/bundle.model';
import { map } from 'rxjs/operators';
import { Lang } from '../model/lang.model';

@Injectable({
  providedIn: 'root'
})
export class LocaleitemService {

  constructor(private httpClient:HttpClient) { }




  //-----------------
  //----BUNDLES------
  //-----------------
  private bundles:Subject<Bundle[]> = new Subject<Bundle[]>();
  public get bundles$():Observable<Bundle[]>{
    return this.bundles.asObservable();
  }

  public fetchBundles(){
    this.httpClient.get<string[]>(environment.apiUrl + "bundles")
    .pipe(
      map( values => {
          return values.map( (value) => {
            return new Bundle(value)
           }
          )
      }
    ))
    .subscribe(
      (fetchedBundles) =>{
        this.bundles.next(fetchedBundles);
      },
      (err => console.error(err))
    );
  }





  //-----------------
  //----LANGS--------
  //-----------------
  private langs:Subject<Lang[]> = new Subject<Lang[]>();
  public get langs$():Observable<Bundle[]>{
    return this.langs.asObservable();
  }

  public fetchLangs(){
    this.httpClient.get<string[]>(environment.apiUrl + "langs")
    .pipe(
      map( values => {
        return values.map( value => {
          return new Lang(value);
        })
      })
    )
    .subscribe(
      (fetchedLangs) =>{
        fetchedLangs.unshift(new Lang("All", "ALL"))
        this.langs.next(fetchedLangs);
      },
      (err => console.error(err))
    )
  }





  //-----------------------
  //----SEARCH RESULT------
  //-----------------------
  private localeItemsResult:Subject<LocaleItem[]> = new Subject<LocaleItem[]>();
  public get localeItemsResult$():Observable<LocaleItem[]>{
    return this.localeItemsResult.asObservable();
  }

  public retriveLocaleItems( criteria: SearchCriteria){
    let searchGetUrl = environment.apiUrl + "locale-items/" + criteria.bundle;
    if ( criteria.lang && criteria.lang != "ALL"){
      searchGetUrl += "/lang/" + criteria.lang;
    }

    this.httpClient.get<LocaleItem[]>( searchGetUrl )
    .pipe(
      map( values => {
        return values.map( value =>{
          var li = new LocaleItem();
          li.bundle = value.bundle;
          li.key = value.key;
          li.lang = value.lang;
          li.content = value.content;
          li.id = value.id;
          return li;
        } )
      })
    )
    .subscribe(
      (values: LocaleItem[]) => {
        this.localeItemsResult.next(values);
      },
      (err:Error) => {
        console.error(err.message);
      }
    );
  }





  //-----------------------
  //----API INIT DATA------
  //-----------------------
  public fetchInitData(){
    this.fetchBundles();
    this.fetchLangs();
  }

}
