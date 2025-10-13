import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DarkThemeSelector } from '@services/index';

@Component({
	selector: 'lg-dark-mode',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './dark-mode.html',
})
export class DarkMode {

	private readonly darkThemeSelector = inject(DarkThemeSelector);
	private readonly formBuilder = inject(FormBuilder);

	public form: FormGroup = this.formBuilder.group({
		theme: [this.darkThemeSelector.currentTheme() === 'dark'],
	});

	ngOnInit(): void {
		this.form.get('theme')?.valueChanges.subscribe((isDark: boolean) => {
			if (isDark) {
				this.darkThemeSelector.setDarkTheme();
			} else {
				this.darkThemeSelector.setLightTheme();
			}
		});
	}
}
