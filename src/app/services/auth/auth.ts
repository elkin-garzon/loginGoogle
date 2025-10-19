import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { LoginType, SignUpType, UserCreated } from '@typesPortafolio/index';

@Injectable({
	providedIn: 'root'
})
export class AuthS {
	private auth = inject(Auth);
	private firestore = inject(Firestore);
	private googleProvider = new GoogleAuthProvider();
	private githubProvider = new GithubAuthProvider();

	public async register(data: SignUpType) {
		const createUser = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
		const actualUser = createUser.user;

		const newUser: UserCreated = {
			uid: actualUser.uid,
			email: data.email,
			name: data.name,
			password: data.password
		};

		await setDoc(doc(collection(this.firestore, 'Users'), actualUser.uid), newUser);
		return newUser;
	}

	public async signIn(data: LoginType) {
		const userCredential = await signInWithEmailAndPassword(this.auth, data.email, data.password);
		const user = userCredential.user;
		return user;
	}

	public async loginGoogle() {
		return await signInWithPopup(this.auth, this.googleProvider);
	}

	public async loginGithub() {
		return await signInWithPopup(this.auth, this.githubProvider);
	}
}
