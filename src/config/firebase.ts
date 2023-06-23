import { DocumentData } from '@firebase/firestore-types'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
	getFirestore,
	collection,
	query,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot
} from 'firebase/firestore'


/** 
	Tive dificuldade em importar as .env no replit, resolvir comitar assim mesmo
	Faz parte
*/

const firebaseConfig = {
	apiKey: 'AIzaSyAk98rh5-xGiouo4mhu1u3aekJb9bEAZLw',
	authDomain: 'web-react-at.firebaseapp.com',
	projectId: 'web-react-at',
	storageBucket: 'web-react-at.appspot.com',
	messagingSenderId: '1:860983954780:web:fc72a8ae84e2c914c54599',
	appId: '860983954780'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

export async function addFornecedor(nome: string, email: string) {
	await addDoc(collection(db, 'fornecedores'), {
		nome,
		email,
		createdAt: Date.now()
	})
	console.log(`Fornecedor adicionado: ${nome} - ${email}`)
}

export async function delFornecedor(id: string) {
	await deleteDoc(doc(db, 'fornecedores', id))
	console.log(`Fornecedor deletado: ${id}`)
}

export async function addContato(
	nome: string,
	email: string,
	phone: string,
	empresa: string
) {
	await addDoc(collection(db, 'contatos'), {
		nome,
		email,
		phone,
		empresa,
		createdAt: Date.now()
	})
	console.log(`Contato adicionado: ${nome} - ${email} - ${phone} - ${empresa}`)
}

export async function delContato(id: string) {
	await deleteDoc(doc(db, 'contatos', id))
	console.log(`Contato deletado: ${id}`)
}

export function getDataSnapshot(
	path: string,
	setter: (value: React.SetStateAction<[] | DocumentData[]>) => void
) {
	const getData = query(collection(db, path))
	const unsubscribe = onSnapshot(getData, (QuerySnapshot) => {
		let dataArray: DocumentData[] = []
		QuerySnapshot.forEach((document: DocumentData) => {
			dataArray.push({ ...document.data(), id: document.id })
		})
		setter(dataArray)
	})

	return unsubscribe
}
