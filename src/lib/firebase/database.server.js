/**
 * @typedef {Object} Book
 * @property {string} title
 * @property {string} author
 * @property {string} description
 * @property {string} short_description
 * @property {File} small_picture
 * @property {File} main_picture
 * @property {string} userId
 * @property {number} likes
 * @property {number} createdAt
 */

import { db } from '$lib/firebase/firebase.server'
import admin from 'firebase-admin';
import { saveFileToBucket } from './firestorage.server'

/**
 * @param {Book} book 
 * @param {string} userId 
 */
export async function addBook(book, userId) {
	
	// save without pictures
	const bookCollection = db.collection('books')
	const bookRef = await bookCollection.add({
		title: book.title,
		author: book.author,
		short_description: book.short_description,
		description: book.description,
		user_id: userId,
		likes: 0,
		created_at: admin.firestore.Timestamp.now().seconds
	})

	// save pictures
	const smallPicUrl = await saveFileToBucket(
		book.small_picture, 
		`${userId}/${bookRef.id}/small_picture`)

	const mainPicUrl = await saveFileToBucket(
		book.main_picture,
		`${userId}/${bookRef.id}/main_picture`
	);

	// update doc with picture urls
	await bookRef.update({
		small_picture: smallPicUrl, 
		main_picture: mainPicUrl
	})

	return bookRef.id
}

/**
 * @param {string} id
 */
export async function getBook(id) {

	const bookRef = await db.collection('books').doc(id).get()

	if (bookRef.exists) {
		return { id: bookRef.id, ...bookRef.data()}
	}
}
