import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogButton } from '../../enums/dialog-button.enum';
import { ModalDialogConfig } from '../../interfaces/modal.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  get buttonLayout(): Record<string, string> {
    const gridColumnCount = this.data.actions?.length || 0;
    return {
      'grid-template-columns': `repeat(${ gridColumnCount }, 1fr)`
    };
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDialogConfig) {}
  @Output() buttonPressed = new EventEmitter<DialogButton>();

  onButtonPressed(buttonKey: DialogButton) {
    this.buttonPressed.emit(buttonKey);
  }


}
