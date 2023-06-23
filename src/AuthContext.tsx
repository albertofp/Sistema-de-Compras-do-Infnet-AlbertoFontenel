import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './config/firebase'
import {
	User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword
} from 'firebase/auth'

export const AuthContext = createContext<{
	currentUser: User | null | undefined
	signup?: (email: string, password: string) => Promise<void> | undefined
	login?: (email: string, password: string) => Promise<void> | undefined
}>({ currentUser: null })

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState<User | null>()

	const login = async (email: string, password: string) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password)
			console.log(`user logged in: ${user.user.email}`)
		} catch (error: any) {
			console.error(error.message)
		}
	}

	const signup = async (email: string, password: string) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password)
			console.log(`user registered: ${user.user.email}`)
		} catch (error: any) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			console.log('auth state changed')
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signup,
		login
	}

	//@ts-ignore
	return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>
}
