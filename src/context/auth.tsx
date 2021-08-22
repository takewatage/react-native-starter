import React, {} from 'react'
import {Alert, Text} from 'react-native'
import * as localStorage from 'src/utilities/localStorage'
import User from 'src/models/user'
import FirestoreService from 'src/services/FirestoreService'
import {MainNavigator} from 'src/navigation/index'
import {authReducer, authInitialValue, FirstActionType, IAuthState} from 'src/reducers/authReducer'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {View} from 'react-native'
import C from 'expo-constants'
import {IAuth, AuthContext} from 'src/context/authContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button} from 'react-native-elements'
import {User as FSUser} from 'firebase'


const AuthProvider: React.FC<React.ReactNode> = ({children}) => {

	const [auth, setUser] = React.useState<IAuth>({currentUser: new User({})})
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		const getId = async() => {
			const currentUser = await window.firebase.auth().currentUser
			if(currentUser) {
				getUser(currentUser)
			} else {
				window.firebase.auth().onAuthStateChanged((user: FSUser) => {
					if(user) {
						getUser(user)
					}
				})
			}
		}

		getId()

	}, [])

	const getUser = async(currentUser: FSUser) => {
		setLoading(true)
		const doc = await FirestoreService.getUser(currentUser.uid)
		if(!doc) {
			return
		}
		const user = new User(doc)
		setUser({currentUser: user})
		setLoading(false)
	}

	const register = async(user: User) => {
		setLoading(true)
		try {
			const fireUser = await window.firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			if(fireUser && fireUser.user) {
				const newUser = new User({
					email: user.email,
					id: fireUser.user.uid,
					name: user.name,
					deviceId: C.deviceId
				})
				await FirestoreService.createUser(newUser)
				setUser({currentUser: newUser})

				return true
			}
			setLoading(false)
		} catch (e) {
			console.log(e.code)
			switch (e.code) {
				case 'auth/invalid-email':
					Alert.alert('メールアドレスの形式で入力して下さい')
					break
				case 'auth/weak-password':
					Alert.alert('パスワードが脆弱です')
					break
				case 'auth/email-already-in-use':
					Alert.alert('メールアドレスは現在使用中です')
					break

			}
		}
		return false
	}

	const signOut = async() => {
		const user = new User({...auth.currentUser, adType: AdType.None})
		await update(user)
		await window.firebase.auth().signOut()
		setUser({currentUser: new User({})})
	}

	const signIn = async(user: User) => {
		setLoading(true)
		try {
			const fireUser = await window.firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			if(fireUser && fireUser.user) {
				if(C.deviceId) {
					FirestoreService.updateDeviceId(fireUser.user.uid, C.deviceId)
				}
			}
		} catch (e) {
			console.log(e.code, 'code!!')
			Alert.alert('ログインに失敗しました')
		}
		setLoading(false)
	}

	const update = async(user: User, fire: boolean = true, loading: boolean = true) => {
		if(loading) {
			setLoading(true)
		}
		if(fire) {
			await FirestoreService.updateUser(user)
		}
		setUser({currentUser: {...user} as User})

		if(loading) {
			setLoading(false)
		}
	}

	const getComponent = () => {
		if(!auth.currentUser.id) {
			return (<First/>)
		}

		if(auth.currentUser.tutorial) {
			return (<Tutorial/>)
		}

		return (<Main/>)
	}

	return (
		<AuthContext.Provider value={{auth, register, setLoading, loading, signOut, signIn, update}}>
			{getComponent()}
			<Spinner visible={loading}/>
		</AuthContext.Provider>
	)
}


export {AuthProvider}