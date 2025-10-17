import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DarkMode, Forms, Input, Title } from '@components/index';
import { AuthS } from '@services/index';
import { InputType, LoginFormGroup, signUpFormFormGroup } from '@typesPortafolio/index';
import { CustomValidators } from '@coreLoginGoogle/index'

@Component({
	selector: 'lg-login',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DarkMode,
		
		Forms
	],
	templateUrl: './login.html',
})
export class Login {
}
