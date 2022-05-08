import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { REGEX_PHONE_NUMBER, REGEX_SERIAL_NUMBER } from 'src/app/core/constants/validations';
import { DialogButtonTheme } from 'src/app/core/enums/dialog-theme.enum';
import { ModalDialogConfig } from 'src/app/core/interfaces/modal.config';
import { DialogComponent } from 'src/app/core/organisms/dialog/dialog.component';
import { DialogButton } from '../../../../core/enums/dialog-button.enum';

@Component({
  selector: 'app-migration-form',
  templateUrl: './migration-form.component.html',
  styleUrls: ['./migration-form.component.scss']
})
export class MigrationFormComponent {
  migrationForm!: FormGroup;

  get currentPhoneNumber() {
    return this.migrationForm.get("currentPhoneNumber");
  }

  get serialSimlastNumbers() {
    return this.migrationForm.get("serialSimlastNumbers");
  }

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router) {
    this.migrationForm = new FormGroup({
      currentPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_PHONE_NUMBER)
      ]),
      serialSimlastNumbers: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX_SERIAL_NUMBER)
      ]),
    });
  }

  continueToNextStep() {
    if(this.migrationForm.valid){
      const dialogInstance = this.showMessage<ModalDialogConfig>({
        icon: "email",
        message: `Por favor confirma que el serial que ingresaste está <span>correcto.</span>`,
        content: `${this.serialSimlastNumbers?.value}`,
        actions: [
          {
            key: DialogButton.CANCEL,
            color: DialogButtonTheme.SECONDARY,
            label: 'Editar',
          },
          {
            key: DialogButton.CONFIRM,
            color: DialogButtonTheme.PRIMARY,
            label: 'Confirmar',
          },
        ]
      });
      this.bindDialogEvents(dialogInstance);
    }
  }

  bindDialogEvents(dialogInstance: MatDialogRef<DialogComponent, any>){
    dialogInstance.componentInstance.buttonPressed.subscribe((buttonKey: DialogButton) => {
      if(buttonKey === DialogButton.CONFIRM){
        this.router.navigate(['/pin/generate']);
      }
      dialogInstance.close();
    });
  }

  showMessage<T>(info: T){
    return this.dialog.open(DialogComponent, {
      width: '350px',
      data: info
    });
  }
}
