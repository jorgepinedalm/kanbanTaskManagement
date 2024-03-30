import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseIconTaskTemplateComponent } from './close-icon-task-template.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('CloseIconTaskTemplateComponent', () => {
  let component: CloseIconTaskTemplateComponent;
  let fixture: ComponentFixture<CloseIconTaskTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseIconTaskTemplateComponent],
      providers: [{ provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } }, DynamicDialogRef]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseIconTaskTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
