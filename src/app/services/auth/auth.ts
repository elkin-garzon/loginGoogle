import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { LoginType } from '@typesPortafolio/index';

@Injectable({
	providedIn: 'root'
})
export class AuthS {
	private auth = inject(Auth);
	private googleProvider = new GoogleAuthProvider();
	private githubProvider = new GithubAuthProvider();

	public async register(data: LoginType) {
		return await createUserWithEmailAndPassword(this.auth, data.email, data.password);
	}

	public async loginGoogle() {
		return await signInWithPopup(this.auth, this.googleProvider);
	}

	public async loginGithub() {
		return await signInWithPopup(this.auth, this.githubProvider);
	}
}
