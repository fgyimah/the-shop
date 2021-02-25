// auth helper files
import { toast } from 'react-toastify';
import firebase from '../firebase';

export async function loginUser(email: string, password: string) {
	try {
		const response = await firebase.auth().signInWithEmailAndPassword(email, password);
		if (response.user !== null) {
			toast.success('Logged in successfully');
		} else {
			toast.error('Unable to log you in at this time, try again later');
		}
	} catch (error) {
		toast.error(error.response?.data);
	}
}

export async function createUser(email: string, password: string, fullName: string) {
	try {
		const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
		if (response.user !== null) {
			// save user to db
			firebase.firestore().doc(`users/${response.user.uid}`).set({
				userId: response.user.uid,
				email: response.user.email,
				fullName,
			});
			toast.success('Successfully created user!');
		} else {
			toast.error('Unable to log you in at this time, try again later');
		}
	} catch (error) {
		toast.error(error.response?.data);
	}
}

export async function sendPasswordResetMail(email: string) {
	try {
		await firebase.auth().sendPasswordResetEmail(email);
		toast.success('Password reset instructions sent to your mail');
	} catch (error) {
		toast.error(error.response?.data);
	}
}

export async function logoutUser() {
	try {
		await firebase.auth().signOut();
		toast.success('Logged out successfully');
	} catch (error) {
		toast.error(error.response?.data);
	}
}

export async function loginWithGoogle() {
	const response = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
	if (response.user !== null) {
		// check if user already exists
		if ((await firebase.firestore().doc(`/users/${response.user.uid}`).get()).exists) {
			toast.success('Logged in successfully');
		} else {
			firebase.firestore().doc(`users/${response.user.uid}`).set({
				email: response.user.email,
				userId: response.user.uid,
			});
			toast.success('Account created successfully');
		}
	}
}
