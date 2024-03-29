import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HideSideBarComponent } from './hide-side-bar.component';

describe('HideSideBarComponent', () => {
  let component: HideSideBarComponent;
  let fixture: ComponentFixture<HideSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HideSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
