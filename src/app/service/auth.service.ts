import { Injectable } from '@angular/core';
import { from, Observable, throwError, BehaviorSubject, of, combineLatest } from 'rxjs';
import { shareReplay, catchError, concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = null;
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 

  auth0Client$ = (from(
    createAuth0Client({
        domain:environment.authUrl,
        client_id:environment.client_id,
        redirect_url:`${window.location.origin}`
      })
    ) as Observable<Auth0Client>).pipe(
      shareReplay(1),
      catchError(err => throwError(err))
  );

  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client:Auth0Client) => from(client.isAuthenticated())),
    tap( res => {
      console.log("registoro se autenticato "  + res)
      this.loggedIn = res;
      this.loggedIn$.next(res)
    } )
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client:Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();


  constructor( private router: Router){
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getUser$(options?):Observable<any>{
    return this.auth0Client$.pipe(
      concatMap((client:Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject.next(user))
    );
  }

  private localAuthSetup(){
    console.log("costrutture controllo se auth")
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn:boolean) => {
        console.log("controllo lanciato da costrutture se loggato")
        if (loggedIn){
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );

    checkAuth$.subscribe(
      (value) => console.log("localAuthSetup sottoscrizione lanciato da costruttore: " + value)
    );
  }

  login(redirectPath: string = '/'){
    this.auth0Client$.subscribe((client:Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri:`${window.location.origin}`,
        appState:{ target: redirectPath }
      })
    })
  }

  private handleAuthCallback(){
    const params = window.location.search;
    if( params.includes('code=') && params.includes('state=') ){
      let targetRoute:string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap( cbRes => {
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );

      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute])
      });
    }
  }


  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: environment.client_id,
        returnTo: window.location.origin
      });
    });
  }

}
