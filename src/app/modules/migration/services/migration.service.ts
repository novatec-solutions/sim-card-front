import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleLog } from 'src/app/core/utils/simple-log.decorator';
import { environment } from 'src/environments/environment';
import { LogType } from '../enums/log-type.enum';
import { AccountContact } from '../interfaces/account-contact.model';
import { AccountEvaluate } from '../interfaces/account-evaluate.model';
import { CustomerInfo } from '../interfaces/customer-info.model';
import { PlanResource } from '../interfaces/plan-resource.model';
import { ValidacionCuenta } from '../interfaces/validacion-cuenta.model';
import { ValidateInfo } from '../interfaces/validate-info.model';
import { ValidatePlanModel } from '../interfaces/validate-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  @SimpleLog(LogType.VERBOSE)
  validarCuenta( data: ValidateInfo ): Observable<ValidacionCuenta> {
    const url = this.baseUrl + "cuenta/informacion";
    return this.http.post<ValidacionCuenta>(url, data);
  }

  @SimpleLog(LogType.VERBOSE)
  validatePlanSimResource( data: ValidatePlanModel ): Observable<PlanResource> {
    const url = this.baseUrl + "/validar/plan";
    return this.http.post<PlanResource>(url, data);
  }

  @SimpleLog(LogType.VERBOSE)
  getCustomerInfoResource( data: CustomerInfo ): Observable<PlanResource> {
    const url = this.baseUrl + "/validar/linea";
    return this.http.post<PlanResource>(url, data);
  }

  @SimpleLog(LogType.VERBOSE)
  accountEvaluate( data: AccountEvaluate ): Observable<AccountContact> {
    //const url = this.baseUrl + "/cuenta/contactos";
    const url = "http://simcard-back-miclaro-dev-novatec.104.209.147.150.nip.io/cuenta/contactos";
    return this.http.post<AccountContact>(url, data);
  }

}
