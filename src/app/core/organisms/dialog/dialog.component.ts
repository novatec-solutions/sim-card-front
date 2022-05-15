import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogButton } from '../../enums/dialog-button.enum';
import { DialogButtonActions, DialogInputs, ModalDialogConfig } from '../../interfaces/modal.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public dialogForm!: FormGroup;
  private formControls: Record<string, FormControl> = {};
  @Output() buttonPressed = new EventEmitter<DialogButton>();
  @Output() formSubmitted = new EventEmitter<FormGroup>();

  get buttonLayout(): Record<string, string> {
    const gridColumnCount = this.data.actions?.length || 0;
    return {
      'grid-template-columns': `repeat(${ gridColumnCount }, 1fr)`
    };
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogConfig
  ) {
    data?.inputs?.forEach(input => {
      this.formControls[input.key] = new FormControl('', input.validators );
    });
    this.dialogForm = new FormGroup(this.formControls);
  }

  getStateDisableForm(button: DialogButtonActions): boolean {
    if( button.key === DialogButton.CONFIRM && this.data?.inputs?.length ) {
      return this.dialogForm.invalid;
    }
    return false;
  }

  onButtonPressed(buttonKey: DialogButton) {
    if( this.data?.inputs?.length && buttonKey === DialogButton.CONFIRM ) {
      return;
    }
    this.buttonPressed.emit(buttonKey);
  }

  onFormSubmitted() {
    this.formSubmitted.emit(this.dialogForm);
  }

}
