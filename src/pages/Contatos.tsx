import { useState, useEffect } from 'react'
import { addContato, db, delContato, getDataSnapshot } from '@/config/firebase'
import { DocumentData } from '@firebase/firestore-types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash2 } from 'lucide-react'

function Contatos() {
	const [contatos, setContatos] = useState<[] | DocumentData[]>([])

	useEffect(() => {
		const unsubscribe = getDataSnapshot('contatos', setContatos)
		return () => unsubscribe()
	}, [])

	const schema = z.object({
		nome: z.string(),
		email: z.string().email(),
		phone: z.string().min(8),
		empresa: z.string()
	})

	type FormData = z.infer<typeof schema>

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		resolver: zodResolver(schema)
	})

	async function onSubmit(formValues: FormData, e: any) {
		e.preventDefault()
		await addContato(formValues.nome, formValues.email, formValues.phone)
		reset()
	}

	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<form
				className='bg-gray-100 rounded-lg p-8 flex flex-col max-w-lg w-full mt-10 md:mt-0'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Nome</label>
					<input
						type='text'
						placeholder='Nome'
						{...register('nome', { required: true })}
						id='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transiion-colors duration-200 ease-in-out'
					/>
					{errors.nome && <span>{errors.nome.message}</span>}
				</div>

				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Email</label>
					<input
						type='text'
						placeholder='Email'
						{...register('email', { required: true })}
						id='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transiion-colors duration-200 ease-in-out'
					/>
					{errors.email && <span>{errors.email.message}</span>}
				</div>

				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Phone</label>
					<input
						type='text'
						placeholder='Phone'
						{...register('phone', { required: true })}
						id='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transiion-colors duration-200 ease-in-out'
					/>
					{errors.phone && <span>{errors.phone.message}</span>}
				</div>

				<div className='relative mb-4'>
					<label className='leading-7 text-sm text-gray-600'>Empresa</label>
					<input
						type='text'
						placeholder='Empresa'
						{...register('empresa', { required: true })}
						id='email'
						className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transiion-colors duration-200 ease-in-out'
					/>
					{errors.empresa && <span>{errors.empresa.message}</span>}
				</div>
				<button
					type={'submit'}
					className='flex mx-auto text-white bg-blue-400 border-0 py-2 px-4 focus:outline-none hover:bg-blue-700 rounded text-sm'
				>
					Adicionar
				</button>
			</form>
			<div className='flex gap-4 flex-wrap'>
				{contatos.map((contato) => {
					return (
						<div
							className='flex justify-between bg-slate-400 rounded-sm p-4 h-20 w-52 min-w-fit min-h-fit gap-4'
							key={contato.id}
						>
							<div className='flex-col items-center justify-center '>
								<h3 className='text-lg'>{contato?.nome}</h3>
								<h4 className='text-md'>{contato?.email}</h4>
								<h4 className='text-md'>{contato?.phone}</h4>
							</div>
							<button
								className='p-2 bg-red-300 rounded-sm'
								onClick={() => delContato(contato.id)}
							>
								<Trash2 />
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Contatos
