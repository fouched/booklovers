import validateBook from '$lib/validators/book.validator.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = await validateBook(formData);

		if (data.success) {
			return { success: true };
		}

		return fail(422, data);
	}
};
