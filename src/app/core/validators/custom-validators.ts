import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators extends Validators {
    static passwordMatch(passwordField: string, confirmPasswordField: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const password = formGroup.get(passwordField)?.value;
            const confirmPassword = formGroup.get(confirmPasswordField)?.value;

            if (!password || !confirmPassword) return null; // no validar si alguno está vacío

            if (password !== confirmPassword) {
                formGroup.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            }

            // Limpia el error si ya coincide
            formGroup.get(confirmPasswordField)?.setErrors(null);
            return null;
        };
    }
}
