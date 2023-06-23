import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../config/firebase'
import { useAuth } from '../AuthContext'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

type FormData = z.infer<typeof schema>

function Login() {
	const [mode, setMode] = useState('login')
	const { signup, login } = useAuth()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	})

	const onSubmit = (formValues: FormData, e: any) => {
		e.preventDefault()
		console.log(`formValues: ${formValues.email} , ${formValues.password}`)
		{
			mode == 'signup'
				? signup!(formValues.email, formValues.password)
				: login!(formValues.email, formValues.password)
		}
		reset()
	}

	return (
		<>
			<form
				className='bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
					<span
						className={mode == 'signup' ? 'underline' : 'cursor-pointer'}
						onClick={() => setMode('signup')}
					>
						Sign up
					</span>
					<span> / </span>
					<span
						className={mode == 'login' ? 'underline' : 'cursor-pointer'}
						onClick={() => setMode('login')}
					>
						Log in
					</span>
				</h2>
				<p>
					{auth.currentUser?.email &&
						`Logged in as: ${auth.currentUser?.email}`}
				</p>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Email</label>
					<input
						type='email'
						placeholder='Email'
						{...register('email', { required: true })}
						id='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transiion-colors duration-200 ease-in-out'
					/>
					{errors.email && <span>{errors.email.message}</span>}
				</div>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Password</label>
					<input
						type='password'
						placeholder='Password'
						{...register('password', { required: true })}
						id='password'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</div>
				<div className='flex gap-4 justify-evenly'>
					<button
						type='submit'
						className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'
					>
						{mode == 'signup' ? 'Sign up' : 'Log in'}
					</button>
				</div>
			</form>
		</>
	)
}

export default Login
