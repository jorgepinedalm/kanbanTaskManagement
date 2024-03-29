import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isDarkMode:boolean;
  constructor(

  ) {
    this.isDarkMode = false;
   }

  toggleDarkMode(currentStatus:boolean):Observable<boolean>{
    this.isDarkMode = currentStatus;
    localStorage.setItem("isDarkMode", ""+this.isDarkMode);
    return of(this.isDarkMode);
  }

  getDarkModeStatus():Observable<boolean>{
    const themeInLocalstorage = localStorage.getItem("isDarkMode");
    const isDarkMode = themeInLocalstorage === "true" || window.matchMedia('(prefers-color-scheme: dark)').matches;
    return of(isDarkMode);
  }
}
