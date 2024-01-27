<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messagesStores from '$lib/stores/messages.stores';

	const login = async () => {
		try {
			const user = await loginWithGoogle()
			console.log(user)
		} catch (error) {
			// @ts-ignore
			if (error.code === 'auth/popup-closed-by-user') {
				return
			}
			console.log(error)
			messagesStores.showError()
		}
	}
</script>
<div class="row">
	<div class="col">
		<button on:click={login} class="btn btn-primary w-100">
			Login With Google
		</button>
	</div>
</div>
