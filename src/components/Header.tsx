import React from 'react'

type Props = {}

function Header({}: Props) {
	return (
		<>
			<h1 className='p-2 text-3xl mt-4 text-slate-900'>Sistema de Compras</h1>
			<span className='font-light italic inline-block text-sm mb-4'>
				github.com/albertofp
			</span>
		</>
	)
}

export default Header
