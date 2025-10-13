import { Component, input } from '@angular/core';

@Component({
	selector: 'lg-title',
	imports: [],
	templateUrl: './title.html'
})
export class Title {
	public titleText = input.required<string>();
}
