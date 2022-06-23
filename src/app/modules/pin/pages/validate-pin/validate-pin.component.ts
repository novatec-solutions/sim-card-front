import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogButton } from 'src/app/core/enums/dialog-button.enum';
import { DialogButtonTheme } from 'src/app/core/enums/dialog-theme.enum';
import { ModalDialogConfig } from 'src/app/core/interfaces/modal.config';
import { DialogComponent } from 'src/app/core/organisms/dialog/dialog.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MigrationService } from 'src/app/modules/migration/services/migration.service';
import { GeneratePinError } from '../../interfaces/generate-pin-response';
import { GenerarPin } from '../../interfaces/generate-pin.model';
import { ValidatePinStatus } from '../../interfaces/validate-pin.model';
import { PinService } from '../../services/pin.service';
import { ValidatePinConfig } from './validate-pin.config';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent {
  pinForm!: FormGroup;
  public contactInfo!: GenerarPin;

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public loaderService: LoadingService,
    public migrationService: MigrationService,
    private PinService: PinService) {

    this.contactInfo = this.router.getCurrentNavigation()?.extras.state as GenerarPin;

    this.pinForm = this.fb.group({
      pin1: ['', [Validators.required]],
      pin2: ['', [Validators.required]],
      pin3: ['', [Validators.required]],
      pin4: ['', [Validators.required]]
    });
  }

  showSuccessDialog(){
    const dialogInstance = this.showMessage<ModalDialogConfig>({
      icon: "simok",
      message: `<span>La solicitud se ha realizado con éxito.</span> Espera unos minutos y una vez tu SIM Card actual quede sin servicio. Por favor inserta tu nueva`,
      content: `SIM Card 4G.`,
      actions: [
        {
          key: DialogButton.CONFIRM,
          color: DialogButtonTheme.PRIMARY,
          label: 'Aceptar',
          type: 'button'
        }
      ]
    });

    dialogInstance.componentInstance.buttonPressed.subscribe((buttonKey: DialogButton) => {
      if(buttonKey === DialogButton.CONFIRM){
        this.router.navigate(['/migration']);
      }
      dialogInstance.close();
    });
  }

  showIncorrectPinDialog(){
    const dialogInstance = this.showMessage<ModalDialogConfig>({
      icon: "warn",
      message: `El código de seguridad que ingresaste`,
      content: `no es correcto, intenta nuevamente`,
      actions: [
        {
          key: DialogButton.CANCEL,
          color: DialogButtonTheme.SECONDARY,
          label: 'Cancelar',
          type: 'button'
        },
        {
          key: DialogButton.CONFIRM,
          color: DialogButtonTheme.PRIMARY,
          label: 'Volver a intentar',
          type: 'button'
        },
      ]
    });

    dialogInstance.componentInstance.buttonPressed.subscribe((buttonKey: DialogButton) => {
      dialogInstance.close();
    });
  }

  generatePin(){
    this.loaderService.show();

    const param = {
      ...this.contactInfo
    };
    this.PinService.generatePin(param).subscribe({
      next: response => {
        if(response.error === GeneratePinError.SUCCESS){
          this.showSuccessGeneratePinDialog();
          return;
        }
        this.showDialogError(ValidatePinConfig.messages.generic);
      },
      error: () => {
        this.loaderService.hide();
        this.showDialogError(ValidatePinConfig.messages.generic);
      },
      complete: () => this.loaderService.hide()
    });
  }

  migrate(){
    this.loaderService.show();
    const { min, iccid } = this.contactInfo;
    const data = {
      min,
      iccidNew: iccid
    };
    this.migrationService.migrate(data).subscribe({
      next: res => {
        console.warn(res.response);
        if(res.response.code === "-12" ){
          throw new Error('Valid token not returned');
        }
        this.showSuccessDialog();
      },
      error: () => {
        this.loaderService.hide();
        this.showDialogError(ValidatePinConfig.messages.iccidChangeError);
      },
      complete: () => this.loaderService.hide()
    })
  }

  showSuccessGeneratePinDialog(){
    const dialogInstance = this.showMessage<ModalDialogConfig>({
      icon: "simok",
      message: `<span>Pin Generado satisfactoriamente</span>`,
      content: `Pin Generado`,
      actions: [
        {
          key: DialogButton.CONFIRM,
          color: DialogButtonTheme.PRIMARY,
          label: 'Aceptar',
          type: 'button'
        }
      ]
    });

    dialogInstance.componentInstance.buttonPressed.subscribe((buttonKey: DialogButton) => {
      this.pinForm.reset();
      dialogInstance.close();
    });
  }

  validatePin(){
    this.loaderService.show();
    const form = this.pinForm.getRawValue();
    const pinNumber = Object.values(form).join('');
    const { documentClient } = this.contactInfo;

    const param = {
      documentClient,
      pinNumber
    };

    this.PinService.validatePin(param).subscribe({
      next: response => {
        if(response.error === ValidatePinStatus.SUCCESS){
          this.migrate();
          return;
        }
        this.showIncorrectPinDialog();
      },
      error : () => {
        this.loaderService.hide();
        this.showIncorrectPinDialog();
      },
      complete: () => this.loaderService.hide()
    });

  }

  showDialogError(content: string){
    this.loaderService.hide();
    const dialogInstance = this.showMessage<ModalDialogConfig>({
      icon: "check",
      message: `Error`,
      content,
      actions: ValidatePinConfig.modals.genericError.actions
    });
    this.bindGenericDialogEvents(dialogInstance);
  }

  bindGenericDialogEvents(dialogInstance: MatDialogRef<DialogComponent, any>){
    dialogInstance.componentInstance.buttonPressed.subscribe((buttonKey: DialogButton) => {
      if(buttonKey === DialogButton.CANCEL){
        dialogInstance.close();
      }
    });
  }

  showMessage<T>(info: T){
    return this.dialog.open(DialogComponent, {
      width: '350px',
      disableClose: true,
      data: info
    });
  }
}
