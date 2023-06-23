import { useAuth } from '@/AuthContext'
import { auth } from '@/config/firebase'
import React from 'react'

type Props = {}

const LogoutBar = (props: Props) => {
	const { currentUser } = useAuth()
	return (
		<div className='flex gap-2 items-center'>
			<h2 className='p-2 text-xl mb-2'>{currentUser!.email}</h2>
			<button
				className='flex mx-auto text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-sm'
				onClick={() => auth.signOut()}
			>
				Log out
			</button>
		</div>
	)
}

export default LogoutBar
