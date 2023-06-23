import './App.css'
import { AuthProvider } from './AuthContext'
import MainContainer from '@/components/MainContainer'

export default function App() {
	return (
		<AuthProvider>
			<main className='flex flex-col items-center justify-center w-full h-[100dvh] bg-slate-100'>
				<div className='flex-col flex'>
					<h1 className='p-2 text-3xl mb-1 mt-4 text-slate-900'>
						Sistema de Compras
					</h1>
					<span className='font-light italic inline-block text-sm'>
						github.com/albertofp
					</span>
					<MainContainer />
				</div>
			</main>
		</AuthProvider>
	)
}
