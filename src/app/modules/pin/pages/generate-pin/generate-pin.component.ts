import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.scss']
})
export class GeneratePinComponent {

  public pinValidationForm!: FormGroup;

  public get chooseLineItem(): FormControl {
    return this.pinValidationForm.get('chooseLineItem') as FormControl;
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private PinService: PinService) {

    this.pinValidationForm = new FormGroup({
      chooseLineItem: new FormControl('', [
        Validators.required
      ]),
    });
  }

  generatePin(): void {
    this.router.navigate(['/pin/validate']);
  }

}
