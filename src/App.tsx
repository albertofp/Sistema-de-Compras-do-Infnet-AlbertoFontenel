import './App.css'
import { AuthProvider } from './AuthContext'
import MainContainer from '@/components/MainContainer'
import {
	Outlet,
	RouterProvider,
	Link,
	Router,
	Route,
	RootRoute
} from '@tanstack/router'
import contatos from './pages/Contatos'
import Fornecedores from './pages/Fornecedores'
import Root from './pages/Root'
import Home from './pages/Home'
import Error from './pages/Error'

const rootRoute = new RootRoute({
	component: Root
})

const homeRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
})

const fornecedoresRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/fornecedores',
	component: Fornecedores
})

const contatosRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/contatos',
	component: contatos
})

const errorRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: Error
})
const routeTree = rootRoute.addChildren([
	homeRoute,
	fornecedoresRoute,
	contatosRoute,
	errorRoute
])
const router = new Router({ routeTree })
declare module '@tanstack/router' {
	interface Register {
		router: typeof router
	}
}

export default function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}
