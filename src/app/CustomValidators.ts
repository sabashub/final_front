import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static lettersOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const lettersOnlyPattern = /^[a-zA-Z]*$/;
      return lettersOnlyPattern.test(value) ? null : { lettersOnly: true };
    };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value.length >= minLength
        ? null
        : { minLength: { requiredLength: minLength } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value.length <= maxLength
        ? null
        : {
            maxLength: {
              requiredLength: maxLength,
              actualLength: value.length,
            },
          };
    };
  }

  static numbersOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^[0-9]*$/.test(value);
      return isValid ? null : { numbersOnly: { value } };
    };
  }

  static greaterThanZero(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value > 0 ? null : { greaterThanZero: { value } };
    };
  }

  static lessThan(maxValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value < maxValue ? null : { lessThan: { value } };
    };
  }

  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value;
  
      if (!password) {
        return { 'required': true }; 
      }
  

      const minLength = 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
      
      const isValid =
        password.length >= minLength &&
        hasUppercase && hasLowercase &&
      
        hasNumber  &&
        hasSpecial;
  
      if (!isValid) {


        console.log("invalid")
        return { 'invalidPassword': true }; 
      }
  console.log("valid")
      return null; 
    };
    
  }
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;

      if (!email) {
        return { 'required': true }; 
      }

     
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      
      const isValid = emailRegex.test(email);

      if (!isValid) {
        return { 'invalidEmail': true }; 
      }

      return null; 
    };
  }
}
