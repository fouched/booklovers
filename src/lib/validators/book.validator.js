// @ts-nocheck
import yup from 'yup';

export default async function validate(formData, edit = false) {
	const schema = yup.object({
		title: yup
			.string()
			.required('Book title is required')
			.min(2, 'Book Title must be at least 2 characters')
			.max(100),
		author: yup.string().required('Author is required').min(2).max(200),
		short_description: yup.string().required('Short description is required').min(5).max(200),
		description: yup.string().required('Description is required').min(5).max(5000),
		small_picture: yup
			.mixed()
			.nullable()
			.test('fileRequired', 'Small picture required', (value) => {
				return value !== null || edit;
			})
			.test('fileType', 'The file must be an image', (value) => {
				if (value && value.type && value.size) {
					return ['image/png', 'image/jpeg'].includes(value.type);
				}
				return true;
			})
			.test('fileSize', 'The file must be under 1MB', (value) => {
				if (value && value.size) {
					return value.size < 1000000; // 1MB
				}
				return true;
			}),
		main_picture: yup
			.mixed()
			.test('fileRequired', 'Main picture required', (value) => {
				return value !== null || edit;
			})
			.test('fileType', 'The file must be an image', (value) => {
				if (value && value.type && value.size) {
					return ['image/png', 'image/jpeg'].includes(value.type);
				}
				return true;
			})
			.test('fileSize', 'The file must be under 4MB', (value) => {
				if (value && value.size) {
					return value.size < 4000000; // 4MB
				}
				return true;
			})
	});

	
	const data = {
		title: formData.get('title'),
		author: formData.get('author'),
		description: formData.get('description'),
		short_description: formData.get('short_description'),
		main_picture: formData.get('main_picture'),
		small_picture: formData.get('small_picture')
	};

	try {
		// validate whole form
		await schema.validate(data, { abortEarly: false });
		
		return { success: true, book: data };
	} catch (error) {
		
		const errors = error.inner.reduce((agg, e) => {
			if (!agg['error_' + e.path]) {
				agg['error_' + e.path] = e.message;
			}
			return agg;
		}, {});

		// do not submit files if there is an error
		delete data.main_picture;
		delete data.small_picture;

		return { ...errors, ...data, success: false };
	}
}
