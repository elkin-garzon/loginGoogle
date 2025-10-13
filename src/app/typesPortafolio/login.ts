import { FormControl, FormGroup } from "@angular/forms";

type FormGroupFrom<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
}>;

export type LoginType = {
    email: string;
    password: string;
}

export type LoginFormGroup = FormGroupFrom<LoginType>;


export type SignUpType = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

export type signUpFormFormGroup = FormGroupFrom<SignUpType>;