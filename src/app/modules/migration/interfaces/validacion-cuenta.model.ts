import { IccidStatus } from "../enums/iccid-status.enum";

export interface ValidacionCuenta {
  response: {
    code: string;
    description: string;
    iccidStatus: IccidStatus;
  }
  
}
