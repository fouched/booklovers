<script>
// @ts-nocheck

	import BookForm from '$lib/components/books/BookForm.svelte';

	export let data
	export let form
</script>

<BookForm form={{ ...data.book, ...form }}/>

