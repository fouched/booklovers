// @ts-nocheck
import { addBook } from '$lib/firebase/database.server.js';
import validateBook from '$lib/validators/book.validator.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = await validateBook(formData);

		if (data.success) {
			const bookId = await addBook(data.book, locals.user.id)
			throw redirect(303, `/book/${bookId}`)
		}

		return fail(422, data);
	}
};
