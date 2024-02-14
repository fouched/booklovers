import { getBooksForUser } from '$lib/firebase/database.server';

export async function load({ locals }) {
	// @ts-ignore
	const books = await getBooksForUser(locals.user.id)

	return {
		books
	}
}
