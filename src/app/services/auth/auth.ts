import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { LoginType, ResponseLogin, SignUpType, UserCreated } from '@typesPortafolio/index';
import { map, Observable, of, switchMap } from 'rxjs';

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
	}

	public async signIn(data: LoginType): Promise<ResponseLogin> {
		const userCredential = await signInWithEmailAndPassword(this.auth, data.email, data.password) as unknown as ResponseLogin;
		return userCredential;
	}

	public async loginGoogle() {
		return await signInWithPopup(this.auth, this.googleProvider);
	}

	public async loginGithub() {
		return await signInWithPopup(this.auth, this.githubProvider);
	}

	public async getUserbyId(id: string) {
		const userDoc = await getDoc(doc(this.firestore, 'Users', id));
		if (userDoc.exists()) {
			return { uid: id, ...userDoc.data() };
		}
		return null;
	}
}
