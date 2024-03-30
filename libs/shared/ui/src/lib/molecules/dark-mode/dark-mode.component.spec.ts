import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DarkModeComponent } from './dark-mode.component';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { UIState } from '@board-management/shared-store';
import { BehaviorSubject, of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { SwitchComponent } from '../../atoms/switch/switch.component';

describe('DarkModeComponent', () => {
  let component: DarkModeComponent;
  let fixture: ComponentFixture<DarkModeComponent>;
  let store:Store;
  let mockUIState: UIState;
  let isDarkMode$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    
    isDarkMode$ = new BehaviorSubject<boolean>(false);

    mockUIState = {
      selectSelectedBoard: jest.fn(() => isDarkMode$) 
    } as unknown as UIState;

    await TestBed.configureTestingModule({
      imports: [DarkModeComponent, NgxsModule.forRoot([UIState]), MockComponent(SwitchComponent)],
      providers: [
        { provide: Select, useValue: () => of() },
        { provide: UIState, useValue: mockUIState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("OnInit", () => {
    it("should call getDarkModeStatus", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const getDarkModeStatusSpy = jest.spyOn(component, "getDarkModeStatus").mockImplementation(jest.fn());
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalled();
      expect(getDarkModeStatusSpy).toHaveBeenCalled();
    })

    describe("changeDarkModeStatus", () => {
      it("should change status of dark mode", () => {
        component.darkModeStatus = false;
        jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
        component.changeDarkModeStatus();
      })
    })

    describe("getDarkModeStatus", () => {
      it("get dark mode status", () => {
        Object.defineProperty(component, 'isDarkMode$', { writable: true });  
        component.isDarkMode$ = of(true);
        component.darkModeStatus  = false;
        const applyDarkModeSpy = jest.spyOn(component, "applyDarkMode").mockImplementation(jest.fn());
        component.getDarkModeStatus();
        expect(component.darkModeStatus).toBeTruthy();
        expect(applyDarkModeSpy).toHaveBeenCalledWith(true);

      })
    })

    describe("applyDarkMode", () => {
      it('should apply hide sidebar class to body when darkModeStatus is true', () => {
        const bodySpy = jest.spyOn(document.body.classList, 'add');
        component.applyDarkMode(true);
        expect(bodySpy).toHaveBeenCalledWith('dark-theme');
      });
    
      it('should remove hide sidebar class from body when darkModeStatus is false', () => {
        const bodySpy = jest.spyOn(document.body.classList, 'remove');
        component.applyDarkMode(false);
        expect(bodySpy).toHaveBeenCalledWith('dark-theme');
      });
    })
  })
});
