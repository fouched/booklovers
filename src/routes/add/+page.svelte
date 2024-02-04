<script>
// @ts-nocheck
	import BookForm from '$lib/components/books/BookForm.svelte'
	export let form
</script>

<div class="row">
	<div class="col">
		<h1>Add Book</h1>
	</div>
</div>

{#if form && form.success}
	<h2>Success</h2>
{:else}
	<BookForm {form} />
{/if}

<svelte:head>
	<title>Book Lovers - Add Book</title>
</svelte:head>