import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input, Title } from '@components/index';
import { InputType, LoginFormGroup } from '@typesPortafolio/index';

@Component({
	selector: 'lg-forms-login',
	imports: [
		ReactiveFormsModule,
		Title,
		Input
	],
	templateUrl: './forms-login.html'
})
export class FormsLogin {

	private form = inject(FormBuilder);
	public actionForm = output<string>();

	public loginForm: LoginFormGroup = this.form.nonNullable.group({
		email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
		password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
	});

	public inputsData: InputType[] = [
		{
			label: 'Email',
			name: 'email',
			control: this.loginForm.controls['email'],
			typeInput: 'email',
			placeholder: 'your-email@example.com'
		},
		{
			label: 'Password',
			name: 'password',
			control: this.loginForm.controls['password'],
			typeInput: 'password',
			placeholder: 'your-password'
		}
	]

	public async login() {
		console.log(this.loginForm.value);
	}

	public viewFormSignUp() {
		this.actionForm.emit('signUp');
	}
}
