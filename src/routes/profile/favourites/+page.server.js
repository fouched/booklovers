import { getLikedBooks } from '$lib/firebase/database.server'

export async function load({ locals }) {
	// @ts-ignore
	const books = await getLikedBooks(locals.user.id)

	return {
		books
	}
}