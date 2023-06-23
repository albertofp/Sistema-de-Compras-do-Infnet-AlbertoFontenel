import { auth } from '../config/firebase'
import Login from '../pages/Login'
import { useAuth } from '../AuthContext'

function MainContainer() {
	const { currentUser } = useAuth()

	return currentUser ? (
		<div className='flex gap-2 items-center'>
			<h2 className='p-2 text-xl mb-2'>{currentUser.email}</h2>
			<button
				className='flex mx-auto text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-sm'
				onClick={() => auth.signOut()}
			>
				Log out
			</button>
		</div>
	) : (
		<Login />
	)
}

export default MainContainer
