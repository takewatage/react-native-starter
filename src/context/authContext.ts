import React, {} from 'react'
import * as localStorage from 'src/utilities/localStorage'
import User from 'src/models/user'

interface AuthContextType {
	register: (user: User) => Promise<boolean>,
	setLoading: (val: boolean) => void,
	auth: IAuth,
	loading: boolean,
	signOut: () => Promise<void>,
	signIn: (user: User) => Promise<void>
	update: (user: User, fire?: boolean, loading?: boolean) => Promise<void>
}

interface IAuth {
	currentUser: User
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export {AuthContext, IAuth, AuthContextType}