import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, sendPasswordResetEmail, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { LoginType, ProfileType, ResponseLogin, SignUpResponse, SignUpType, UserCreated } from '@typesPortafolio/index';
import { Providers } from '@enums/providers';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthS {
	private auth = inject(Auth);
	private firestore = inject(Firestore);
	private googleProvider = new GoogleAuthProvider();
	private githubProvider = new GithubAuthProvider();

	public async register(data: SignUpType, provider: string): Promise<UserCreated> {
		const createUser: UserCredential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
		let dataUser: SignUpResponse = {
			uid: createUser.user.uid,
			email: data.email,
			name: data.name,
			image: `https://robohash.org/${String(Math.floor(10000 + Math.random() * 90000))}`,
			provider: provider
		}
		return this.saveDataUser(dataUser);
	}

	public async signIn(data: LoginType): Promise<ResponseLogin> {
		const userCredential = await signInWithEmailAndPassword(this.auth, data.email, data.password) as unknown as ResponseLogin;
		return userCredential;
	}

	public async loginGoogle(): Promise<UserCreated> {
		let { user } = await signInWithPopup(this.auth, this.googleProvider) as unknown as UserCredential;
		let dataUser: SignUpResponse = {
			uid: user.uid,
			email: user.email || '',
			name: user.displayName || 'No Name',
			image: user.photoURL || `https://robohash.org/${String(Math.floor(10000 + Math.random() * 90000))}`,
			provider: Providers.GOOGLE
		}
		return await this.saveDataUser(dataUser);
	}

	public async loginGithub() {
		return await signInWithPopup(this.auth, this.githubProvider);
	}

	public async getUserbyId(id: string): Promise<UserCreated | null> {
		const userDoc = await getDoc(doc(this.firestore, 'Users', id));
		if (userDoc.exists()) {
			return { uid: id, ...userDoc.data() } as UserCreated;
		}
		return null;
	}

	public async forgetPass(email: string) {
		return await sendPasswordResetEmail(this.auth, email);
	}

	public async logOut() {
		return await this.auth.signOut()
	}


	public async updateUser(data: ProfileType): Promise<ProfileType> {
		await this.saveDataUser(data as SignUpResponse);
		return data;
	}


	private async saveDataUser(data: SignUpResponse): Promise<UserCreated> {
		await setDoc(doc(collection(this.firestore, 'Users'), data.uid), data);
		return data;
	}

	public userActivate$: Observable<boolean> = new Observable<boolean>((subscriber) => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				subscriber.next(true);
			} else {
				subscriber.next(false);
			}
		});
		return () => unsubscribe();
	});
}
