import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnCreateComponent } from './column-create.component';
import { BoardState } from '@board-management/shared-store';
import { NgxsModule, Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('ColumnCreateComponent', () => {
  let component: ColumnCreateComponent;
  let fixture: ComponentFixture<ColumnCreateComponent>;
  let store: Store;
  let ref: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnCreateComponent, NgxsModule.forRoot([BoardState])],
      providers: [
        { provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } },
        { provide: DynamicDialogRef, useValue: {close: jest.fn()} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    ref = TestBed.inject(DynamicDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("saveColumn", () => {
    it('should dispatch AddTasks action and close dialog if form is valid', () => {
      component.columnForm.patchValue(
        {
          name: 'new column'
        }
      )
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const closeSpy = jest.spyOn(ref, "close").mockImplementation(jest.fn());
  
      component.saveColumn();
  
      expect(dispatchSpy).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });
    it('should not dispatch AddTasks action and close dialog if form is invalid', () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const closeSpy = jest.spyOn(ref, "close").mockImplementation(jest.fn());
  
      component.saveColumn();
  
      expect(dispatchSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  })
});
