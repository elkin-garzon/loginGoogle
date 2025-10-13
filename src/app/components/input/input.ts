import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputType } from '@typesPortafolio/index';

@Component({
	selector: 'lg-input',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './input.html'
})
export class Input {
	public inputData = input.required<InputType>();

	public get controlForm() {
		return this.inputData().control as FormControl;
	}
}
