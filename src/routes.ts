import { RootRoute, Route, Router } from '@tanstack/router'
import Root from './pages/Root'
import Home from './pages/Home'
import Fornecedores from './pages/Fornecedores'
import Contatos from './pages/Contatos'
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
	component: Contatos
})

const errorRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: Error
})
export const routeTree = rootRoute.addChildren([
	homeRoute,
	fornecedoresRoute,
	contatosRoute,
	errorRoute
])

declare module '@tanstack/router' {
	interface Register {
		router: typeof router
	}
}
export const router = new Router({ routeTree })
