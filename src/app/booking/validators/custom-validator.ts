import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export class CustomValidator {
    static validateName(control: AbstractControl) {
        const Value = control.value as string;
        if (Value.includes('test')) {
            return {
                invalidName: true
            };
        }

        return null;
    }
    static ValidateSpecialChar(char: string) {
        return (control: AbstractControl) => {
            const Value = control.value as string;
            if (Value.includes(char)) {
                return {
                    invalidSpecialChar: true,
                };
            }

            return null;
        };
    }
    static validatedate(control:FormGroup){
        const checkinDate: any=new Date (control.get('checkinDate')?.value);
        const checkoutDate:any=new Date(control.get('checkoutDate')?.value);
        const diffTime = checkoutDate-checkinDate;
        const diffDays = Math.ceil(diffTime / (1000*60*60*24));
        console.log(diffDays);
        console.log(diffTime);
        if(diffDays<=0){
            control.get('checkoutDate')?.setErrors({
                invalidDate:true,
            })
            return{
                invalidDate:true,
            };
        }
        return null;
    }
}