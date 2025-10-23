import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input, InputFile, Title } from '@components/index';
import { AuthS } from '@services/index';
import { InputType, ProfileType, UserCreated, UserCreatedFormGroup } from '@typesPortafolio/index';

@Component({
	selector: 'lg-profile',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		Title,
		Input,
		InputFile
	],
	templateUrl: './profile.html'
})
export class Profile {
	private auth = inject(AuthS);
	private form = inject(FormBuilder);


	public formProfile: UserCreatedFormGroup = this.form.group({
		uid: this.form.nonNullable.control('', [Validators.required]),
		email: this.form.nonNullable.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
		name: this.form.nonNullable.control('', [Validators.required]),
		lastname: this.form.nonNullable.control('', [Validators.required]),
		image: this.form.nonNullable.control('', [Validators.required]),
		provider: this.form.nonNullable.control('', [Validators.required]),
		phone: this.form.nonNullable.control('', []),
		
	});

	public inputsData: InputType[] = this.createItemsForm();
	public inputsDataFile: InputType = {
		label: 'Profile Image',
		name: 'image',
		control: this.formProfile.controls['image'],
		typeInput: 'file',
		placeholder: '',
	};

	ngOnInit() {
		let data = JSON.parse(localStorage.getItem('token')!);
		if (data.uid) {
			this.auth.getUserbyId(data.uid).then(user => {
				if (user) {
					this.formProfile.patchValue(user);
				}
			});
			return;
		}
		if (data.user.uid) {
			this.auth.getUserbyId(data.user.uid).then(user => {
				if (user) {
					this.formProfile.patchValue(user);
				}
			});
			return;
		}		
	}

	private createItemsForm(): InputType[] {
		return [
			{
				label: 'Email',
				name: 'email',
				control: this.formProfile.controls['email'],
				typeInput: 'email',
				placeholder: 'your-email@example.com'
			},
			{
				label: 'Name',
				name: 'name',
				control: this.formProfile.controls['name'],
				typeInput: 'text',
				placeholder: 'Your Name',
			},
			{
				label: 'Last name',
				name: 'lastname',
				control: this.formProfile.controls['lastname'],
				typeInput: 'text',
				placeholder: 'Your Last name',
			},
			{
				label: 'Phone',
				name: 'phone',
				control: this.formProfile.controls['phone'],
				typeInput: 'number',
				placeholder: 'Your Phone Number',
			},
		];
	}

	public async onSubmit() {
		await this.auth.updateUser(this.formProfile.value as ProfileType);
	}
}
