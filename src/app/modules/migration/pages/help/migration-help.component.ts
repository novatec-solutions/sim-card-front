import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-migration-help',
  templateUrl: './migration-help.component.html',
  styleUrls: ['./migration-help.component.scss']
})
export class MigrationHelpComponent implements OnInit {
  pinForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }
}
