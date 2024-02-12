<script>
	// @ts-nocheck
	import Like from '$lib/components/books/Like.svelte'

	/** @type {import('./$types').PageData}*/
	export let data
	let book = data.book
</script>

<div class="row mt-3">
	<div class="col">
		<h1>Title: {book.title}</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Author: {book.author}</h2>
	</div>
</div>
<div class="row">
	<div class="col">
		<img class="main-image" src="{book.main_picture}" alt="{book.title}" />
	</div>
</div>
<div class="row mt-3">
	<div class="col">
		<p>{book.description}</p>
	</div>
</div>
<div class="row">
	<div class="col">
		<Like textAlign="center" {book} />
	</div>
</div>

<svelte:head>
	<title>Book Lovers - {book.title}</title>
</svelte:head>

<style>
	.main-image {
		max-height: 300px;
	}
	.row {
		text-align: center;
	}
</style>