import { CommonModule } from '@angular/common';
import { Component, computed, HostBinding, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input, Title } from '@components/index';
import { CustomValidators } from '@coreLoginGoogle/index';
import { InputType, LoginFormGroup, LoginType, signUpFormFormGroup, SignUpType } from '@typesPortafolio/index';

@Component({
	selector: 'lg-form-auth',
	imports: [
		ReactiveFormsModule,
		CommonModule,
		Title,
		Input
	],
	templateUrl: './form-auth.html'
})
export class FormAuth {
	@HostBinding('class') hostClass = 'block';

	private animateTransition() {
		// reinicia la animación
		this.hostClass = 'block animate-fade-in-scale';
		setTimeout(() => {
			this.hostClass = 'block';
		}, 1000); // duración de tu animación
	}



	public modeForm = input.required<string>();
	public actionForm = output<string>();
	public dataFormAuth = output<LoginType | SignUpType>();
	public signInGoogle = output<string>();

	private form = inject(FormBuilder);

	public label = computed(() =>
		this.modeForm() === 'login' ? 'Login' : 'Sign Up'
	);

	public formAuth!: signUpFormFormGroup | LoginFormGroup
	public inputsData: InputType[] = [];

	ngOnChanges() {
		this.buildForm();
		this.animateTransition();
	}
	public viewFormSignUp() {
		this.actionForm.emit(this.label() === 'Login' ? 'signUp' : 'login');
	}

	private buildForm() {
		this.inputsData = [];
		if (this.modeForm() === 'login') {
			this.formAuth = this.form.nonNullable.group({
				email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
				password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
			});

			this.inputsData = [
				{
					label: 'Email',
					name: 'email',
					control: this.formAuth.controls['email'],
					typeInput: 'email',
					placeholder: 'your-email@example.com',
				},
				{
					label: 'Password',
					name: 'password',
					control: this.formAuth.controls['password'],
					typeInput: 'password',
					placeholder: 'your-password',
				},
			];
		}

		if (this.modeForm() === 'signUp') {
			this.formAuth = this.form.nonNullable.group({
				email: this.form.nonNullable.control('', [Validators.required, Validators.email]),
				password: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
				name: this.form.nonNullable.control('', [Validators.required]),
				confirmPassword: this.form.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
			}, {
				validators: CustomValidators.passwordMatch('password', 'confirmPassword')
			});

			this.inputsData = [
				{
					label: 'Name',
					name: 'name',
					control: this.formAuth.controls['name'],
					typeInput: 'text',
					placeholder: 'your-name'
				},
				{
					label: 'Email',
					name: 'email',
					control: this.formAuth.controls['email'],
					typeInput: 'email',
					placeholder: 'your-email@example.com'
				},
				{
					label: 'Password',
					name: 'password',
					control: this.formAuth.controls['password'],
					typeInput: 'password',
					placeholder: 'your-password'
				},
				{
					label: 'Confirm Password',
					name: 'confirmPassword',
					control: this.formAuth.controls['confirmPassword'],
					typeInput: 'password',
					placeholder: 'your-password'
				}
			];
		}
	}

	public authActionForm() {
		if (this.formAuth.valid) {
			this.dataFormAuth.emit(this.formAuth.getRawValue() as LoginType | SignUpType);
		}
	}

	public async loginGoogle() {
		this.signInGoogle.emit('google');
	}
}
