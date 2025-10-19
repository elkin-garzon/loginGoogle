import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkMode } from '@components/index';

@Component({
	selector: 'lg-base',
	imports: [
		RouterOutlet,
		DarkMode
	],
	templateUrl: './base.html'
})
export class Base {}
