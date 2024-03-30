import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { ToastModule } from "primeng/toast";
import { UIEventsService } from '../../../services/ui-libs-events.service';
import { UIEvent } from '../../../enums/UIEvent.enum';

@Component({
  selector: 'lib-close-icon-task-template',
  standalone: true,
  imports: [CommonModule, MenuModule, ToastModule],
  providers: [MessageService],
  templateUrl: './close-icon-task-template.component.html',
  styleUrl: './close-icon-task-template.component.scss',
})
export class CloseIconTaskTemplateComponent {
  idTask?:number;
  items: MenuItem[] | undefined;
  @ViewChild('menu') menu?:Menu; 
  
  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig,
    private uiEventService: UIEventsService
    ){
    this.idTask = config.data.id;
    this.items = [
      {
        label: 'Delete',
        command: () => {
            this.uiEventService.setEvent({action:UIEvent.clickDeleteTask})
        }
    }
    ]
  }

  clickButton(event:any):void{
    event.stopPropagation();
    this.menu?.toggle(event);
  }
}
