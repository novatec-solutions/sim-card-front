import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-migration-form',
  templateUrl: './migration-form.component.html',
  styleUrls: ['./migration-form.component.scss']
})
export class MigrationFormComponent implements OnInit {
  pinForm!: FormGroup;
  contact = JSON.parse(localStorage.getItem('contact') as any);

  constructor(public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private PinService: PinService) {
    this.pinForm = this.fb.group({
      pin1: ['', [Validators.required]],
      pin2: ['', [Validators.required]],
      pin3: ['', [Validators.required]],
      pin4: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {
    //this.showMessage("Herman Andres");
  }

  showMessage(info: any){
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '350px',
      data: info
    });
    dialogRef.afterClosed();
  }
}
