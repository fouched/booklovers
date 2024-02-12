/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} description
 * @property {string} short_description
 * @property {File} small_picture
 * @property {File} main_picture
 * @property {string} user_id
 * @property {number} likes
 * @property {number} createdAt
 * @property {boolean} likedBook
 */

import { db } from '$lib/firebase/firebase.server';
import admin from 'firebase-admin';
import { saveFileToBucket } from './firestorage.server';

/**
 * @param {Book} book
 * @param {string} userId
 */
export async function addBook(book, userId) {
	// save without pictures
	const bookCollection = db.collection('books');
	const bookRef = await bookCollection.add({
		title: book.title,
		author: book.author,
		short_description: book.short_description,
		description: book.description,
		user_id: userId,
		likes: 0,
		created_at: admin.firestore.Timestamp.now().seconds
	});

	// save pictures
	const smallPicUrl = await saveFileToBucket(
		book.small_picture,
		`${userId}/${bookRef.id}/small_picture`
	);

	const mainPicUrl = await saveFileToBucket(
		book.main_picture,
		`${userId}/${bookRef.id}/main_picture`
	);

	// update doc with picture urls
	await bookRef.update({
		small_picture: smallPicUrl,
		main_picture: mainPicUrl
	});

	return bookRef.id;
}

/**
 * @param {string} id
 * @param {string | null} userId
 * @returns {Promise<Book | undefined>}
 */
export async function getBook(id, userId = null) {

	const bookRef = await db.collection('books').doc(id).get();

	if (bookRef.exists) {
		const user = userId ? await getUser(userId) : null
		const likedBook = user?.bookIds?.includes(id) || false
		
		// @ts-ignore
		return { id: bookRef.id, ...bookRef.data(), likedBook };
	}
}

/**
 * @param {string} userId
 */
export async function getUser(userId) {

	const user = await db.collection('users').doc(userId).get()
	return user?.data()
}


/**
 * @param {string} id
 * @param {any} form
 * @param {any} userId
 */
export async function editBook(id, form, userId) {
	const bookRef = await db.collection('books').doc(id);

	let mainPicture = form.main_picture || null;
	let smallPicture = form.small_picture || null;
	delete form.main_picture;
	delete form.small_picture;

	await bookRef.update(form);

	if (mainPicture && mainPicture.size) {
		console.log('updating main picture');
		// ensure no cached image
		const mainPicUrl = await saveFileToBucket(
			mainPicture,
			`${userId}/${bookRef.id}/main_picture_${Date.now()}`
		);

		bookRef.update({ main_picture: mainPicUrl });
	}

	if (smallPicture && smallPicture.size) {
		console.log('updating small picture');
		// ensure no cached image
		const smallPicUrl = await saveFileToBucket(
			smallPicture,
			`${userId}/${bookRef.id}/small_picture_${Date.now()})}`
		);

		bookRef.update({ small_picture: smallPicUrl });
	}
}

/**
 * @param {string} bookId
 * @param {string} userId
 * @returns {Promise<Book | undefined>}
 */
export async function toogleBookLike(bookId, userId) {
	const bookDoc = db.collection('books').doc(bookId)
	const userDoc = db.collection('users').doc(userId)

	const user = await userDoc.get()
	const userData = user.data()

	// @ts-ignore
	if (userData.bookIds && userData.bookIds.includes(bookId)) {
		// unlike the book
		await userDoc.update({
			bookIds: admin.firestore.FieldValue.arrayRemove(bookId)
		})
		await bookDoc.update({
			likes: admin.firestore.FieldValue.increment(-1)
		})
	} else {
		// like the book
		await userDoc.update({
			bookIds: admin.firestore.FieldValue.arrayUnion(bookId)
		});
		await bookDoc.update({
			likes: admin.firestore.FieldValue.increment(1)
		});
	}

	return await getBook(bookId, userId)
}