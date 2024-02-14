<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-img-redundant-alt -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<script>
// @ts-nocheck
	import { goto } from '$app/navigation';
	import Like from '$lib/components/books/Like.svelte'

	export let book

	async function goToBook() {
		await goto(`/book/${book.id}`)
	}
</script>
<div on:click={goToBook} class="row mt-2">
	<div class="col col-12 col-sm-6 col-md-4">		
		<img src="{book.small_picture}" alt={book.title}/>
	</div>
	<div class="col col-12 col-sm-6 col-md-8">
		<h2>Title: {book.title}</h2>
		<h4>Author: {book.author}</h4>
		<p>
			{book.short_description}
		</p>
		<Like {book} on:toggleLike/>
	</div>
</div>

<style>
	img {
		max-width: 90%;
		margin: 5px auto;
		max-height: 200px;
		display: block;
	}
	.row {
		border: solid 1px gray;
		cursor: pointer;
	}
</style>
