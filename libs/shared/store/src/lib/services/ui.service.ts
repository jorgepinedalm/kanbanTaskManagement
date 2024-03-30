import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isDarkMode:boolean;
  hideSidebar:boolean;
  constructor(

  ) {
    this.isDarkMode = false;
    this.hideSidebar = false;
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

  toggleHideSidebar(currentStatus:boolean):Observable<boolean>{
    this.hideSidebar = currentStatus;
    localStorage.setItem("hideSidebar", ""+this.hideSidebar);
    return of(this.hideSidebar);
  }
  getSideBarVisibility():Observable<boolean>{
    const hideSidebar = localStorage.getItem("hideSidebar") === "true" || window.innerWidth <= 425;
    return of(hideSidebar);
  }
}
