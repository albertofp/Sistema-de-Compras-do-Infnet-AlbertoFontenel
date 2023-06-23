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

type Props = {}

function Root({}: Props) {
	const { currentUser } = useAuth()

	return (
		<main className='flex flex-col items-center w-full h-[100dvh] bg-slate-100'>
			<h1 className='p-2 text-3xl mt-4 text-slate-900'>Sistema de Compras</h1>
			<span className='font-light italic inline-block text-sm mb-4'>
				github.com/albertofp
			</span>

			{currentUser ? (
				<>
					<div className='flex gap-2 items-center'>
						<h2 className='p-2 text-xl mb-2'>{currentUser.email}</h2>
						<button
							className='flex mx-auto text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-sm'
							onClick={() => auth.signOut()}
						>
							Log out
						</button>
					</div>
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
