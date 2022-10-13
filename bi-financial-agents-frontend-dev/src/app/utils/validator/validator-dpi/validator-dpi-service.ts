import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorDPIService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
    let answer:boolean = ValidatorDPIService.cuiIsValid(control.value);
    
    if (answer)
        return null;
    else
        return { validationCui: true }
  }





 private static cuiIsValid(cui: string): boolean {
    if (!cui) {
      return false;
    }
    cui = cui.replace(/ /g, '');
    
    const cuiRegExp = /^\d{4}\s?\d{5}\s?\d{4}$/;
   
    if (!cuiRegExp.test(cui)) {
      return false;
    }
    
    const depto = parseInt(cui.substring(9, 11), 10);
    const muni = parseInt(cui.substring(11, 13), 0);
    const numero: any = cui.substring(0, 8);
    const verificador = parseInt(cui.substring(8, 9), 0);
    let total = 0;
    const munisPorDepto = [
        17 ,  8 ,  16 ,  16 , 13 , 14 ,  19 , 8 ,
        24 , 21 , 9 , 30 , 32 , 21 , 8 , 17 , 14 ,
        5 , 11 , 11 , 7 , 17 
    ];

    if (depto === 0 || muni === 0) {
      return false;
    }

    if (depto > munisPorDepto.length) {
      return false;
    }

    if (muni > munisPorDepto[depto - 1]) {
      return false;
    }


    for (let i = 0; i < numero.length; i++) {
      total += numero[i] * (i + 2);
    }

    const modulo = (total % 11);

    return modulo === verificador;
  }


}