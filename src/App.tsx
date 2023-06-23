import './App.css'
import { AuthProvider } from './AuthContext'
import { RouterProvider } from '@tanstack/router'
import { router } from './routes'

export default function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}
