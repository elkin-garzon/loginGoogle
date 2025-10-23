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
	public previewUrl: string | ArrayBuffer | null = null;

	public get controlForm() {
		return this.inputData().control as FormControl;
	}

	public onFileSelected(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			this.previewUrl = reader.result;
		};
		reader.readAsDataURL(file);
	}
}
