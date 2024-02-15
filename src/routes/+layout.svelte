<script>
// @ts-nocheck

	import 'bootstrap/dist/css/bootstrap.min.css'
	import Nav from '$lib/components/Nav.svelte'
	import messageStore from '$lib/stores/messages.stores'
	import '$lib/firebase/firebase.client'
	import { onMount, onDestroy } from 'svelte'
	import { sendJWTToken } from '$lib/firebase/auth.client';
	import authStore from '$lib/stores/auth.store.js';
	import bookNotifyStore from '$lib/stores/book-notify.store'

	let notifyBook
	const unsub = bookNotifyStore.subscribe(book => {
		if (!$authStore.isLoggedIn) {
			notifyBook = book
			return
		}

		if ($authStore.userId !== book.user_id) {
			notifyBook = book
			return
		}
	})

	onDestroy(() => {
		unsub()
	})

	function closeFlash() {
		notifyBook = null
	}

	export let data

	let isLoggedIn = data.isLoggedIn
	$: isLoggedIn = $authStore.isActive ? $authStore.isLoggedIn : data.isLoggedIn


	/**
	 * @type {number | NodeJS.Timeout | undefined}
	 */
	let timerId;

	async function sendServerToken() {
		try {
			await sendJWTToken()		
		} catch (error) {
			clearInterval(timerId)
			console.log(error)
		}
		
	}

	onMount(async () => {
		try {
			await sendServerToken()
			timerId = setInterval(async () => {
				sendServerToken()
			}, 1000 * 60 * 10) // 10 minutes
		} catch (error) {
			console.log(error)
			messageStore.showError();
		}

		// for layout this is not really required
		// but still good practice to clear timers
		return () => {
			clearInterval(timerId)
		}
	})

	const hideFlash = () => {
		messageStore.hide()
	}

</script>
<Nav {isLoggedIn} />
<main class="container">
	<div class="row mt-3">
			{#if $messageStore.show}
			<div class="col">				
					<div 
							class:alert-danger={$messageStore.type === 'error'} 
							class:alert-success={$messageStore.type === 'success'} 
							class="alert alert-dismissible" role="alert">
							<strong>{$messageStore.type === 'error' ? 'Error' : 'Success'}:</strong>
							{$messageStore.message}
							<button type="button" class="btn-close" on:click={hideFlash} aria-label="Close" />
					</div>					
			</div>
			{/if}
	</div>	
	<slot />
	{#if notifyBook} 
	<div
			class="toast show position-fixed top-0 end-0 m-3"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div class="toast-header">
				<strong class="me-auto">New Book</strong>
				<button
					on:click={closeFlash}
					type="button"
					class="btn-close"
					data-bs-dismiss="toast"
					aria-label="Close"
				/>
			</div>
			<div class="toast-body">
				Book <a href="/book/{notifyBook.id}">{notifyBook.title}</a> just created!!
			</div>
	</div>	
	{/if}
</main>

