import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  @Input() item:string|undefined
  @Output() onDelete = new EventEmitter
  @Output() onCancel = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    this.onDelete.emit(this.item)
  }

  cancel(){
    this.onCancel.emit()
  }
}
