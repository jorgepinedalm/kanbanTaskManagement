import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HideSideBarComponent } from './hide-side-bar.component';
import { UIState } from '@board-management/shared-store';
import { NgxsModule } from '@ngxs/store';

describe('HideSideBarComponent', () => {
  let component: HideSideBarComponent;
  let fixture: ComponentFixture<HideSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideSideBarComponent, NgxsModule.forRoot([UIState])],
    }).compileComponents();

    fixture = TestBed.createComponent(HideSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
