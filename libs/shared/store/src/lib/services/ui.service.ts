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
    const isDarkMode = localStorage.getItem("isDarkMode") == "true";
    return of(isDarkMode);
  }
}
