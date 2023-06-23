import { useAuth } from '@/AuthContext'
import React from 'react'

function Home() {
	const { currentUser } = useAuth()

	return (
		<div className='flex-col items-center'>
			<h2 className='text-2xl'>Bem vindo!</h2>
			<h3>Último acesso: {currentUser?.metadata.lastSignInTime}</h3>
		</div>
	)
}

export default Home
