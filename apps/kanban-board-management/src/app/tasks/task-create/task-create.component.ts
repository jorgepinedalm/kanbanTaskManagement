import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, DropdownComponent, InputTextComponent, TextareaComponent } from '@board-management/ui';
import { Select, Store } from '@ngxs/store';
import { AddTasks, Board, BoardState, ColumnStatus, GetStatusFromBoard, Task } from '@board-management/shared-store';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent, TextareaComponent, DropdownComponent, ButtonComponent],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent implements OnInit {
  @Select(BoardState.selectStateColumnStatus) status$?: Observable<ColumnStatus[]>;
  columnStatus:ColumnStatus[];
  idBoard:number;
  board:Board;
  taskForm:FormGroup;

  constructor(
    private config: DynamicDialogConfig, 
    private store:Store,
    private fb: FormBuilder,
    private ref: DynamicDialogRef
    ){
    this.columnStatus = [];
    this.idBoard = config.data.idBoard;
    this.board = config.data.Board;
    this.taskForm = this.createForm();
  }
  ngOnInit(): void {
    this.store.dispatch(new GetStatusFromBoard(this.idBoard));
    this.getColumnStatusToCreate();
  }

  getColumnStatusToCreate(): void{
    this.status$?.subscribe(columStatus => {
      this.columnStatus = columStatus;
      this.status?.setValue(this.columnStatus[0].name);
    })
  }
  
  createForm():FormGroup{
    return  this.fb.group({
      title: ['', Validators.required],
      description: '',
      status: ['', Validators.required],
      subtasks: this.fb.array([])
    });
  }

  addSubtask() {
    this.subtasks.push(this.fb.group({
      title: '',
      isDone: false
    }));
  }

  deleteSubtask(index: number) {
    this.subtasks.removeAt(index);
    console.log(this.subtasks);
  }

  saveTask():void{
    if(this.taskForm.valid){
      const newTask:Task = this.taskForm.getRawValue();
      console.log(this.taskForm.getRawValue());
      this.store.dispatch(new AddTasks(newTask, this.idBoard));
      this.ref.close();
    }
  }

  get title() {return this.taskForm.get("title")}
  get status() {return this.taskForm.get("status")}
  get subtasks() { return this.taskForm.get('subtasks') as FormArray;}

}
