import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
	getFirestore,
	collection,
	query,
	addDoc,
	deleteDoc,
	doc
} from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE,
	authDomain: 'web-react-at.firebaseapp.com',
	projectId: 'web-react-at',
	storageBucket: 'web-react-at.appspot.com',
	messagingSenderId: import.meta.env.VITE_MESS_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
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
