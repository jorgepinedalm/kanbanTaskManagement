import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HideSideBarComponent } from './hide-side-bar.component';
import { UIState } from '@board-management/shared-store';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { BehaviorSubject, of } from 'rxjs';

describe('HideSideBarComponent', () => {
  let component: HideSideBarComponent;
  let fixture: ComponentFixture<HideSideBarComponent>;
  let store:Store;
  let mockUIState: UIState;
  let hideSidebar$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    
    hideSidebar$ = new BehaviorSubject<boolean>(false);

    mockUIState = {
      selectSelectedBoard: jest.fn(() => hideSidebar$) 
    } as unknown as UIState;

    await TestBed.configureTestingModule({
      imports: [HideSideBarComponent, NgxsModule.forRoot([UIState])],
      providers: [
        { provide: Select, useValue: () => of() },
        { provide: UIState, useValue: mockUIState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HideSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("OnInit", () => {
    it("should call getSidebarVisibility", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const getSidebarVisibilitySpy = jest.spyOn(component, "getSidebarVisibility").mockImplementation(jest.fn());
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalled();
      expect(getSidebarVisibilitySpy).toHaveBeenCalled();
    })

    describe("toggleSidebarVibility", () => {
      it("should toggle value of hideSidebar", () => {
        component.hideSidebar = false;
        jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
        component.toggleSidebarVisibility();
        expect(component.hideSidebar).toBeTruthy();
      })
    })

    describe("getSidebarVisibility", () => {
      it("get hideSidebar status", () => {
        Object.defineProperty(component, 'hideSidebar$', { writable: true });  
        component.hideSidebar$ = of(true);
        component.hideSidebar = false;
        const applyHideSidebarSpy = jest.spyOn(component, "applyHideSidebar").mockImplementation(jest.fn());
        component.getSidebarVisibility();
        expect(component.hideSidebar).toBeTruthy();
        expect(applyHideSidebarSpy).toHaveBeenCalledWith(true);

      })
    })

    describe("applyHideSidebar", () => {
      it('should apply hide sidebar class to body when hideSidebar is true', () => {
        const bodySpy = jest.spyOn(document.body.classList, 'add');
        component.applyHideSidebar(true);
        expect(bodySpy).toHaveBeenCalledWith('hide-sidebar');
      });
    
      it('should remove hide sidebar class from body when hideSidebar is false', () => {
        const bodySpy = jest.spyOn(document.body.classList, 'remove');
        component.applyHideSidebar(false);
        expect(bodySpy).toHaveBeenCalledWith('hide-sidebar');
      });
    })
  })
});
