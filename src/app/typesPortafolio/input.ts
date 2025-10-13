import { AbstractControl, FormControl } from "@angular/forms";

export type InputType = {
    label: string;
    name: string;
    control: FormControl | AbstractControl | null;
    typeInput: string;
    placeholder: string;
}