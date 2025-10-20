import { FormControl, FormGroup } from "@angular/forms";

type FormGroupFrom<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
}>;

export type LoginType = {
    email: string;
    password: string;
}

export type LoginFormGroup = FormGroupFrom<LoginType>;


export type SignUpType = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

export type signUpFormFormGroup = FormGroupFrom<SignUpType>;


export type UserCreated = Omit<SignUpType, 'confirmPassword'> & {
    uid: string;
}


export type ResponseLogin = {
    user: User;
    providerId: string;
    _tokenResponse: TokenResponse;
    operationType: string;
}

export type TokenResponse = {
    federatedId: string;
    providerId: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    fullName: string;
    lastName: string;
    photoUrl: string;
    localId: string;
    displayName: string;
    idToken: string;
    context: string;
    oauthAccessToken: string;
    oauthExpireIn: number;
    refreshToken: string;
    expiresIn: string;
    oauthIdToken: string;
    rawUserInfo: string;
    kind: string;
}

export type User = {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous: boolean;
    photoURL: string;
    providerData: ProviderDatum[];
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
}

export type ProviderDatum = {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: null;
    photoURL: string;
}

export type StsTokenManager = {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
}
