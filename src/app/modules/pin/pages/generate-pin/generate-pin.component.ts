import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/core/organisms/messages/messages.component';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.scss']
})
export class GeneratePinComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private PinService: PinService) {
  }

  ngOnInit(): void {
  }

}
