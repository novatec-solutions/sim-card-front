import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
