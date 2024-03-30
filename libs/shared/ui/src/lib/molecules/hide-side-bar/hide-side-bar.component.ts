import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { GetSidebarVisibility, ToggleSidebar, UIState } from '@board-management/shared-store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'lib-hide-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hide-side-bar.component.html',
  styleUrl: './hide-side-bar.component.scss',
})
export class HideSideBarComponent  implements OnInit, OnDestroy {
  hideSidebar:boolean;
  suscription:Subscription;
  @Select(UIState.selectSidebarVisibility) hideSidebar$?: Observable<boolean>;

  constructor(
    private store:Store
  ){
    this.hideSidebar = false;
    this.suscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngOnInit(): void {
    this.store.dispatch(new GetSidebarVisibility());
    this.getSidebarVibility();
  }

  toggleSidebarVibility(): void {
    this.hideSidebar = !this.hideSidebar;
    this.store.dispatch(new ToggleSidebar(this.hideSidebar));
  }

  getSidebarVibility(): void{
    this.suscription = this.hideSidebar$?.subscribe(status => {
      this.hideSidebar = status;
      this.applyHideSidebar(status);
    }) as Subscription;
  }

  applyHideSidebar(hideSidebar:boolean): void {
    const body = document.body;
    if(hideSidebar){
      body.classList.add("hide-sidebar");
    }else{
      body.classList.remove("hide-sidebar");
    }
  }
}