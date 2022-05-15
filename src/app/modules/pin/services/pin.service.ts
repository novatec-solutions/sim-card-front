import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleLog } from 'src/app/core/utils/simple-log.decorator';
import { environment } from 'src/environments/environment';
import { LogType } from '../../migration/enums/log-type.enum';
import { GeneratePinResponse } from '../interfaces/generate-pin-response';
import { GenerarPin } from '../interfaces/generate-pin.model';
import { ValidatePin, ValidatePinResponse } from '../interfaces/validate-pin.model';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  @SimpleLog(LogType.VERBOSE)
  generatePin(data: GenerarPin): Observable<GeneratePinResponse> {
    const url = this.baseUrl + "pin/generar";
    return this.http.post<any>(url, data);
  }

  @SimpleLog(LogType.VERBOSE)
  validatePin(data:ValidatePin): Observable<ValidatePinResponse> {
    const url = this.baseUrl + "pin/validar";
    return this.http.post<any>(url, data);
  }
}
