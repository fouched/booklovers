// @ts-nocheck
import { getBook, toogleBookLike } from '$lib/firebase/database.server.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
	if (!locals.user) {
		throw error(403, { message: 'Access Denied'})
	}

	const book = await getBook(params.id)
	if (!book) {
		throw error(404, { message: 'Book not found'})
	}

	try {

		const newBook = await toogleBookLike(params.id, locals.user.id);
		return json({ ...newBook });		
	} catch (error) {
		console.log(error)
		throw error(500, {message: 'Server error, please try again later'})	
	}

}

