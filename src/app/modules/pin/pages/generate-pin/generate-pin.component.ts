import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TypeContacts } from 'src/app/modules/migration/enums/contact-type.enum';
import { AccountContactInfo } from 'src/app/modules/migration/interfaces/account-contact.model';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.scss']
})
export class GeneratePinComponent {

  public pinValidationForm!: FormGroup;
  public contactInfo: Array<AccountContactInfo> = [];

  public get templateColumns(){
    return this.contactInfo.length > 3 ? 3 : 2;
  }

  public get chooseLineItem(): FormControl {
    return this.pinValidationForm.get('chooseLineItem') as FormControl;
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private PinService: PinService) {

    this.contactInfo = this.router.getCurrentNavigation()?.extras.state as Array<AccountContactInfo>;

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
    this.router.navigate(['/pin/validate']);
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

}
