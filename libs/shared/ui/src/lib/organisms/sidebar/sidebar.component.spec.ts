import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MockComponent } from 'ng-mocks';
import { DarkModeComponent } from '../../molecules/dark-mode/dark-mode.component';
import { HideSideBarComponent } from '../../molecules/hide-side-bar/hide-side-bar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, MockComponent(DarkModeComponent), MockComponent(HideSideBarComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
