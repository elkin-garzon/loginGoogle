import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthS, DarkThemeSelector } from '@services/index';

@Component({
	selector: 'lg-dark-mode',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './dark-mode.html',
})
export class DarkMode {
	private auth = inject(AuthS);
	private readonly darkThemeSelector = inject(DarkThemeSelector);
	private readonly formBuilder = inject(FormBuilder);
	private router = inject(Router)

	public viewClosedBtn: boolean = false;

	public form: FormGroup = this.formBuilder.group({
		theme: [this.darkThemeSelector.currentTheme() === 'dark'],
	});

	ngOnInit(): void {
		this.auth.userActivate$.subscribe((resp: boolean) => {
			this.viewClosedBtn = resp;
		});

		this.form.get('theme')?.valueChanges.subscribe((isDark: boolean) => {
			if (isDark) {
				this.darkThemeSelector.setDarkTheme();
			} else {
				this.darkThemeSelector.setLightTheme();
			}
		});
	}

	public async closeSession() {
		await this.auth.logOut();
		this.router.navigateByUrl('login');
	}
}
