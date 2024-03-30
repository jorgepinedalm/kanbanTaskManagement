import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseIconTaskTemplateComponent } from './close-icon-task-template.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { UIEventsService } from '../../../services/ui-libs-events.service';

describe('CloseIconTaskTemplateComponent', () => {
  let component: CloseIconTaskTemplateComponent;
  let fixture: ComponentFixture<CloseIconTaskTemplateComponent>;
  let uiEventService:UIEventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseIconTaskTemplateComponent, MenuModule, ToastModule],
      providers: [MessageService, { provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } }, DynamicDialogRef]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseIconTaskTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    uiEventService = TestBed.inject(UIEventsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize idTask correctly', () => {
    const id = 123;
    const config = { data: { id } };
    const ref = {} as DynamicDialogRef;
    component = new CloseIconTaskTemplateComponent(ref, config, uiEventService);
    expect(component.idTask).toEqual(id);
  });

  it('should initialize items correctly', () => {
    const id = 123;
    const config = { data: { id } };
    const ref = {} as DynamicDialogRef;
    component = new CloseIconTaskTemplateComponent(ref, config, uiEventService);
    expect(component.items?.length).toBeGreaterThan(0);
  });

  it('should toggle menu when clickButton is called', () => {
    const mockEvent = { stopPropagation: jest.fn() };
    component.menu = { toggle: jest.fn() } as any;
    component.clickButton(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(component.menu?.toggle).toHaveBeenCalledWith(mockEvent);
  });
});
