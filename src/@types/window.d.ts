import firebase from 'firebase/app'

declare global {
	interface Window {
		db: firebase.firestore.Firestore,
		firebase: firebase
	}
}
