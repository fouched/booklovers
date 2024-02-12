<script>
// @ts-nocheck
	import { goto } from '$app/navigation'
	import Book from '$lib/components/books/Book.svelte';

	export let data

	const prevPage = async () => {
		await goto(`/?page=${--data.page}`)
	}
	const nextPage = async () => {
		await goto(`/?page=${++data.page}`)
	}	
</script>
<div class="row">
	<div class="col">
		<h1>Latest Books</h1>
		<h2>Page: {data.page}</h2>
	</div>
</div>
{#each data.books as book (book.id)}
	<Book {book} />
{/each}
<div class="container">
	<div class="row mt-3">
		<div class="col"><button disabled={!data.previous} on:click={prevPage} class="btn btn-info w-100">Prev</button></div>
		<div class="col"><button disabled={!data.next} on:click={nextPage} class="btn btn-info w-100">Next</button></div>
	</div>
</div>
