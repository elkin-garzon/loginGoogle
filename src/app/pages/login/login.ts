import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DarkMode, Input, Title } from '@components/index';
import { AuthS } from '@services/index';
import { InputType, LoginFormGroup, signUpFormFormGroup } from '@typesPortafolio/index';


@Component({
	selector: 'lg-login',
	imports: [
		DarkMode,
		Title,
		Input,
		CommonModule,
		ReactiveFormsModule
	],
	templateUrl: './login.html',
	providers: [
		AuthS
	]
})
export class Login {

	private auth = inject(AuthS);
	private form = inject(FormBuilder);


	public loginForm: LoginFormGroup = this.form.nonNullable.group({
		email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
		password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
	});

	public signUpForm: signUpFormFormGroup = this.form.nonNullable.group({
		email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
		password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
		name: this.form.nonNullable.control('', [Validators.required]),
		confirmPassword: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
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

	public viewLogin: boolean = true;

	public async login() {
		console.log(this.loginForm.value);
		console.log(this.loginForm.valid);
		// const res = await this.auth.register('test3@example.com', 'password');
		// console.log(res);
	}


	public async register() {
		console.log(this.signUpForm.value);
		// const res = await this.auth.register('test3@example.com', 'password');
		// console.log(res);
	}


	public viewFormSignUp() {
		this.viewLogin = !this.viewLogin;
	}
}
