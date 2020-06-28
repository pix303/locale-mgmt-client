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

  private currentBundle: Subject<Bundle> = new Subject<Bundle>();
  public get currentBundle$():Observable<Bundle>{
    return this.currentBundle.asObservable();
  }

  public setCurrentBundle(candidate:Bundle){
    console.log("bundle",candidate)
    this.currentBundle.next(candidate)
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





  //-------------------------------
  //----LOCALEITEM REQUESTS------
  //-------------------------------
  private localeItemsSearchResult:Subject<LocaleItem[]> = new Subject<LocaleItem[]>();
  public get localeItemsResult$():Observable<LocaleItem[]>{
    return this.localeItemsSearchResult.asObservable();
  }

  public retriveLocaleItems( criteria: SearchCriteria){
    let searchGetUrl = environment.apiUrl + "locale-items/" + criteria.bundle;
    if ( criteria.lang && criteria.lang != "ALL"){
      searchGetUrl += "/lang/" + criteria.lang;
    }
    this.setCall(searchGetUrl,this.localeItemsSearchResult);
  }


  private localeItemsByKeyResult:Subject<LocaleItem[]> = new Subject<LocaleItem[]>();
  public get localeItemsByKeyResult$():Observable<LocaleItem[]>{
    return this.localeItemsByKeyResult.asObservable();
  }

  public retriveLocaleItemsByKey( id: string ){
    let localeitemIdUrl = environment.apiUrl + "locale-item/" + id;
    this.setCall(localeitemIdUrl,this.localeItemsByKeyResult);
  }




  private setCall( url: string, model:Subject<LocaleItem[]> ){
    this.httpClient.get<LocaleItem[]>( url )
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
        model.next(values);
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
