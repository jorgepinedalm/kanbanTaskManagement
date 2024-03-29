import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../../atoms/switch/switch.component';
import { FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { GetDarkModeStatus, ToggleDarkMode, UIState } from "@board-management/shared-store";
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lib-dark-mode',
  standalone: true,
  imports: [CommonModule, FormsModule, SwitchComponent],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent implements OnInit, OnDestroy {
  darkModeStatus:boolean;
  suscription:Subscription;
  @Select(UIState.selectDarkModeStatus) isDarkMode$?: Observable<boolean>;

  constructor(
    private store:Store
  ){
    this.darkModeStatus = false;
    this.suscription = new Subscription();

  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngOnInit(): void {
    this.store.dispatch(new GetDarkModeStatus());
    this.getDarkModeStatus();
  }

  changeDarkModeStatus(): void {
    this.store.dispatch(new ToggleDarkMode(this.darkModeStatus));
  }

  getDarkModeStatus(): void{
    this.suscription = this.isDarkMode$?.subscribe(status => {
      this.darkModeStatus = status;
      this.applyDarkMode(status);
    }) as Subscription;
  }

  applyDarkMode(isDarkMode:boolean): void {
    const body = document.body;
    if(isDarkMode){
      body.classList.add("dark-theme");
    }else{
      body.classList.remove("dark-theme");
    }
  }
}
