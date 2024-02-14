<script>
	import Book from '$lib/components/books/Book.svelte'

	export let data

	/**
	 * @param {{ detail: { id: any; }; }} evt
	 */
	function filterUnlikedBooks(evt) {
		const { id } = evt.detail

		data.books = data.books.filter((b) => b.id !== id )
	}
</script>

{#each data.books as book (book.id)}
	<Book {book} on:toggleLike={ filterUnlikedBooks } />
{/each}