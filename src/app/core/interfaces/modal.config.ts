import { DialogButton } from "../enums/dialog-button.enum";
import { DialogButtonTheme } from "../enums/dialog-theme.enum";

export interface DialogButtonActions {
  key: DialogButton;
  color: DialogButtonTheme;
  label: string;
}

export interface ModalDialogConfig {
  icon?: string;
  message?: string;
  content?: string;
  actions?: DialogButtonActions[];
}
