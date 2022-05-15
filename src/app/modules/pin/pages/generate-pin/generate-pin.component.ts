import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/core/organisms/dialog/dialog.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TypeContacts } from 'src/app/modules/migration/enums/contact-type.enum';
import { AccountContactExtras } from 'src/app/modules/migration/interfaces/account-contact.model';
import { GeneratePinError } from '../../interfaces/generate-pin-response';
import { PinService } from '../../services/pin.service';
import { GeneratePinConfig } from './generate-pin.config';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.scss']
})
export class GeneratePinComponent {

  public pinValidationForm!: FormGroup;
  public contactInfo!: AccountContactExtras;

  public get templateColumns(){
    return this.contactInfo?.info?.length > 3 ? 3 : 2;
  }

  public get chooseLineItem(): FormControl {
    return this.pinValidationForm.get('chooseLineItem') as FormControl;
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public loaderService: LoadingService,
    private PinService: PinService) {

    this.contactInfo = this.router.getCurrentNavigation()?.extras.state as AccountContactExtras;

    this.pinValidationForm = new FormGroup({
      chooseLineItem: new FormControl('', [
        Validators.required
      ]),
    });
  }

  getSelectedIcon(type: TypeContacts): string {
    if(type === TypeContacts.MAIL){
      return 'email';
    }
    return 'phone';
  }

  generatePin(): void {
    this.loaderService.show();
    const formData = this.pinValidationForm.getRawValue();
    const { chooseLineItem: { contact, type } } = formData;
    const data = {
      // documentClient : this.contactInfo.documentData,
      // contactData : contact,
      // contactType : type
      documentClient : "CC-1053826485",
      contactData : "heanfig@gmail.com",
      contactType : "1"
    }
    this.PinService.generatePin(data).subscribe({
      next: (response) => {
        if(response.error === GeneratePinError.SUCCESS){
          this.router.navigate(['/pin/validate']);
          return;
        }
        this.showMessage(GeneratePinConfig.messages.generatePinError);
      },
      complete: () => this.loaderService.hide()
    });
  }

  private maskEmail(email: string): string {
    const censorWord = (str: string) => {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };
    const arr = email.split("@");
    return censorWord(arr[0]) + "@" + censorWord(arr[1]);
  }

  public maskLine(line: string, type: TypeContacts): string {
    if(type === TypeContacts.MAIL){
     return this.maskEmail(line);
    }
    return line[0] + "*".repeat(line.length - 2) + line.slice(-1);
  }

  showMessage<T>(info: T){
    return this.dialog.open(DialogComponent, {
      width: '350px',
      disableClose: true,
      data: info
    });
  }

}
