import { Component, Input, SimpleChange, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {

  @Input()
  buttonClass: string = '';

  @Input()
  type: string = 'button';

  @Input()
  link: string = '';

  @Output()
  buttonPressed = new EventEmitter<MouseEvent>();

  @Input()
  disabled:boolean = false;

  constructor(private router: Router) { }

  onClick(event: MouseEvent) {
    this.buttonPressed.emit(event);
    if(this.link) {
      this.router.navigate([this.link]);
    }
  }

  ngOnChanges(simpleChange: { disabled: SimpleChange }) {
    if(simpleChange?.disabled?.currentValue){
      this.disabled = simpleChange.disabled.currentValue;
    }
  }

}
