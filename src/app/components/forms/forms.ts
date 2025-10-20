import { Component, inject, output } from '@angular/core';
import { FormAuth } from '@components/form-auth/form-auth';
import { LoginType, SignUpType } from '@typesPortafolio/index';
import { AuthS } from '@services/index';
@Component({
	selector: 'lg-forms',
	imports: [
		FormAuth,
	],
	templateUrl: './forms.html',
})
export class Forms {

	private auth = inject(AuthS);
	public viewForms = 'login';
	public sendData = output<LoginType | SignUpType | any>();

	public viewForm(action: string) {
		this.viewForms = action;
	}

	public async handleDataFormAuth(data: LoginType | SignUpType) {
		if (data.hasOwnProperty('confirmPassword')) {
			await this.auth.register(data as SignUpType);
			this.loginEmailAndPassword(data.email, data.password);
			return;
		}

		this.loginEmailAndPassword(data.email, data.password);
	}

	private async loginEmailAndPassword(email: string, password: string) {
		let response = await this.auth.signIn({ email, password });
		localStorage.setItem('token', JSON.stringify(response));
		this.sendData.emit(response);
	}


	public handleDataFormAuthGoogle(event: any) {
		this.auth.loginGoogle().then((response) => {
			this.sendData.emit(response);
			localStorage.setItem('token', JSON.stringify(response));
		});
	}
}
