import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PinService } from '../../services/pin.service';
import { DialogComponent } from 'src/app/core/organisms/dialog/dialog.component';
import { ModalDialogConfig } from 'src/app/core/interfaces/modal.config';
import { DialogButton } from 'src/app/core/enums/dialog-button.enum';
import { DialogButtonTheme } from 'src/app/core/enums/dialog-theme.enum';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.scss']
})
export class ValidatePinComponent {
  pinForm!: FormGroup;
  contact = JSON.parse(localStorage.getItem('contact') as any);

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public loaderService: LoadingService,
    private PinService: PinService) {

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
      content: `no es correcto.`,
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
      if(buttonKey === DialogButton.CONFIRM){
        this.generatePin(true);
      }
      dialogInstance.close();
    });
  }

  generatePin(ini:boolean = false){
    const param = {
      "documentClient" : localStorage.getItem('document'),
      "contactData" : this.contact.contact,
      "contactType" : this.contact.type
    };

    this.PinService.generatePin(param).subscribe((res: { error: number; }) => {
      if(res.error == 0 && !ini){
        const data = {icon: "info", text: "Pin Generado satisfactoriamente",
        redText: "Aceptar", redClass:"btn bg-red"};
        this.showMessage(data);
      }
    });
  }

  validatePin(){
    this.showSuccessDialog();
    return;

    const form = this.pinForm.value;
    const pinNumber = `${form.pin1}${form.pin2}${form.pin3}${form.pin4}`;

    const param = {
      "documentClient": localStorage.getItem('document'),
      "pinNumber": pinNumber
    };

    this.PinService.validatePin(param).subscribe((res: { error: number; response: { description: any; }; }) => {
      if(res.error > 0){
        const data = {icon: "info", text: res.response.description,
          grayText: "Finalizar", redText: "Atras", grayClass:"btn bg-dark", redClass:"btn bg-red"};
        this.showMessage(data);
      }else{
        this.router.navigate(['/cuenta']);
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
