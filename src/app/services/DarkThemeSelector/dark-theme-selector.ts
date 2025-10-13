import { Injectable, signal } from '@angular/core';

// Enum which contains only LIGHT and DARK themes, if DEVICE theme selected it means you don't need a value for this purpose. DEVICE theme means no user preferences in the app. That is why value should be undefined (removed from localStorage).
export enum AppTheme {
	LIGHT = 'light',
	DARK = 'dark',
}

// for SSR and SSG support.
const CLIENT_RENDER = typeof localStorage !== 'undefined';
// name of variable in localStorage.
const LS_THEME = 'theme';
// previously selected value by user, if available.
let selectedTheme: AppTheme | undefined = undefined;
// if render happens on client side
if (CLIENT_RENDER) {
	// then set value from localStorage or if it not available leave it undefined.
	selectedTheme = localStorage.getItem(LS_THEME) as AppTheme || undefined;
}

@Injectable({
	providedIn: 'root'
})
export class DarkThemeSelector {
	public currentTheme = signal<AppTheme | undefined>(selectedTheme);

	public setLightTheme() {
		this.currentTheme.set(AppTheme.LIGHT);
		this.setToLocalStorage(AppTheme.LIGHT);
		this.removeClassFromHtml('dark');
	}
	
	public setDarkTheme() {
		this.currentTheme.set(AppTheme.DARK);
		this.setToLocalStorage(AppTheme.DARK);
		this.addClassToHtml('dark');
	}

	private addClassToHtml(className: string) {
		if (CLIENT_RENDER) {
			this.removeClassFromHtml(className);
			document.documentElement.classList.add(className)
		}
	}
	private removeClassFromHtml(className: string) {
		if (CLIENT_RENDER) {
			document.documentElement.classList.remove(className)
		}
	}
	private setToLocalStorage(theme: AppTheme) {
		if (CLIENT_RENDER) {
			localStorage.setItem(LS_THEME, theme);
		}
	}
}

