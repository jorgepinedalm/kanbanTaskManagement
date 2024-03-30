import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputTextComponent } from '@board-management/ui';
import { Store } from '@ngxs/store';
import { AddColumnInBoard, ColumnStatus } from '@board-management/shared-store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-column-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, ButtonComponent],
  templateUrl: './column-create.component.html',
  styleUrl: './column-create.component.scss',
})
export class ColumnCreateComponent {
  columnForm:FormGroup;
  idBoard:number;

  constructor(private store:Store, private config: DynamicDialogConfig, private ref: DynamicDialogRef){
    this.columnForm  = new FormGroup({
      name: new FormControl('')
    })
    this.idBoard = config.data.idBoard;
  }

  saveColumn(): void {
    if(this.columnForm.valid){
      const column:ColumnStatus = {
        idColumnStatus: 0,
        name: this.columnForm.get("name")?.value,
        tasks: []
      }
      this.store.dispatch(new AddColumnInBoard(column, this.idBoard));
      this.ref.close();
    }
    
  }
}
