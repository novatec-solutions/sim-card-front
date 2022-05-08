import { ValidatorFn } from "@angular/forms";
import { DialogButton } from "../enums/dialog-button.enum";
import { DialogButtonTheme } from "../enums/dialog-theme.enum";

export type DialogButtonType = 'button' | 'submit';
export type DialogInputErrors = { [key: string]: string };

export type DialogInputs = {
  key: string,
  validators: Array<ValidatorFn>,
  mask: string,
  errors: DialogInputErrors
};

export interface DialogButtonActions {
  key: DialogButton;
  color: DialogButtonTheme;
  label: string;
  type: DialogButtonType;
}

export interface ModalDialogConfig {
  icon?: string;
  message?: string;
  content?: string;
  inputs?: DialogInputs[];
  actions?: DialogButtonActions[];
}
