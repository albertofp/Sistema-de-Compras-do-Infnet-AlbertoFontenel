import { Link } from '@tanstack/router'
import React from 'react'

type Props = {}

function Menu({}: Props) {
	return (
		<>
			<nav className='flex gap-2 text-xl justify-evenly'>
				<Link to='/'>Home</Link>
				<Link to='/fornecedores'>Fornecedores</Link>
				<Link to='/contatos'>Contatos</Link>
			</nav>
			<hr />
		</>
	)
}

export default Menu
