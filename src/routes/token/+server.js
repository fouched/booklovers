import { json } from '@sveltejs/kit'
import { auth } from '$lib/firebase/firebase.server'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	try {
		const { token, email } = await request.json()
		const verifiedToken = await auth.verifyIdToken(token ?? '', true)
		
		if (verifiedToken.email == email) {
			cookies.set('jwt', token, {
				// exp is in seconds
				maxAge: verifiedToken.exp - Date.now() / 1000, 
				path: '/'
			})

			return json({ message: 'success'}, { status: 200 })
		}

		return json({ message: 'Access Denied' }, { status: 403 });
	} catch (error) {
		return json({ message: 'Access Denied'}, {status: 403})
	}
}

