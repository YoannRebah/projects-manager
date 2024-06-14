import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {
  constructor() { }

  public static get regexValidateTelFr(): RegExp {
    return /^0[1-9]([-. ]?[0-9]{2}){4}$/
  }

  public static telFrIsValid(tel: string): boolean {
    const regex: RegExp = ValidatorsService.regexValidateTelFr;
    return regex.test(tel);
  }

}
