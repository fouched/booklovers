<script>
import { onDestroy } from 'svelte';
import messageStore from '../lib/stores/messages.stores'

const showSuccessFlash = () => {
	messageStore.showSuccess('A success message')
}

const showErrorFlash = () => {
	messageStore.showError('An error message')
}


</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={showSuccessFlash}>Succss</button>
<button on:click={showErrorFlash}>Error</button>