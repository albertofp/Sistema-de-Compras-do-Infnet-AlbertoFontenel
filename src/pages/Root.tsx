import { useAuth } from '@/AuthContext'
import { auth } from '@/config/firebase'
import {
	Outlet,
	RouterProvider,
	Link,
	Router,
	Route,
	RootRoute
} from '@tanstack/router'
import React from 'react'
import Login from './Login'
import Menu from '@/components/Menu'
import Header from '@/components/Header'
import LogoutBar from '@/components/LogoutBar'

function Root() {
	const { currentUser } = useAuth()

	return (
		<main className='flex flex-col items-center w-full h-[100dvh] bg-slate-100'>
			<Header />
			{currentUser ? (
				<>
					<LogoutBar />
					<Menu />
					<Outlet />
				</>
			) : (
				<Login />
			)}
		</main>
	)
}
export default Root
