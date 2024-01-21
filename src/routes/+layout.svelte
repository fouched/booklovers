<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from '$lib/components/Nav.svelte'
import messageStore from '$lib/stores/messages.stores'
import '$lib/firebase/firebase.client'

const hideFlash = () => {
	messageStore.hide()
}
</script>
<Nav />
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
</main>

