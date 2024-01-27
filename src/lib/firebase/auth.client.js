import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, 
	signInWithPopup, signOut, sendPasswordResetEmail } from 'firebase/auth'

export async function loginWithGoogle() {
	const auth = getAuth()
	const userCredential = await signInWithPopup(auth, new GoogleAuthProvider())
	return userCredential.user
}

export async function logout() {
	await signOut(getAuth())
}

/**
 * @param {string} email
 * @param {string} password
 */
export async function registerWithEmailAndPassword(email, password) {
	const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
	return userCredential.user;
}

/**
 * @param {string} email
 * @param {string} password
 */
export async function loginWithEmailAndPassword(email, password) {
	const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
	return userCredential.user;
}

/**
 * @param {string} email
 */
export async function sendPasswordReset(email) {
	await sendPasswordResetEmail(getAuth(), email)
}
