import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputType } from '@typesPortafolio/index';

@Component({
	selector: 'lg-input-file',
	imports: [
		CommonModule
	],
	templateUrl: './input-file.html'
})
export class InputFile {
	public inputData = input.required<InputType>();

	public get controlForm() {
		return this.inputData().control as FormControl;
	}


}
