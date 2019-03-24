import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { chkSumValidator } from 'src/app/step2/step2.component';

@Directive({
  selector: '[appChkSum]',
  providers: [{provide: NG_VALIDATORS, useExisting: ChkSumDirective, multi: true}]
})
export class ChkSumDirective {

  constructor() { }

  @Input('appChkSum') inString: string;
  
   validate(control: AbstractControl): {[key: string]: any} | null {
     return this.inString ? chkSumValidator(new RegExp(this.inString, 'i'))(control) : null;
   }

}
