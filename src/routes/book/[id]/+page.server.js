import { getBook } from '$lib/firebase/database.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const book = await getBook(params.id)

	if (!book) {
		throw error(404, 'Book not found')
	}

	return {
		book
	}
}

