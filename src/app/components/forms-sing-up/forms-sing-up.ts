import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input, Title } from '@components/index';
import { CustomValidators } from '@coreLoginGoogle/index';
import { InputType, signUpFormFormGroup } from '@typesPortafolio/index';

@Component({
	selector: 'lg-forms-sing-up',
	imports: [
		ReactiveFormsModule,
		Title,
		Input
	],
	templateUrl: './forms-sing-up.html'
})
export class FormsSingUp {
	private form = inject(FormBuilder);
	public actionForm = output<string>();

	public signUpForm: signUpFormFormGroup = this.form.nonNullable.group({
		email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
		password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
		name: this.form.nonNullable.control('', [Validators.required]),
		confirmPassword: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
	}, {
		validators: CustomValidators.passwordMatch('password', 'confirmPassword')
	});

	public inputsSignUpData: InputType[] = [
		{
			label: 'Name',
			name: 'name',
			control: this.signUpForm.controls['name'],
			typeInput: 'text',
			placeholder: 'your-name'
		},
		{
			label: 'Email',
			name: 'email',
			control: this.signUpForm.controls['email'],
			typeInput: 'email',
			placeholder: 'your-email@example.com'
		},
		{
			label: 'Password',
			name: 'password',
			control: this.signUpForm.controls['password'],
			typeInput: 'password',
			placeholder: 'your-password'
		},
		{
			label: 'Confirm Password',
			name: 'confirmPassword',
			control: this.signUpForm.controls['confirmPassword'],
			typeInput: 'password',
			placeholder: 'your-password'
		}
	]

	public async register() {
		console.log(this.signUpForm);
	}

	public viewFormSignUp() {
		this.actionForm.emit('login');
	}
}
