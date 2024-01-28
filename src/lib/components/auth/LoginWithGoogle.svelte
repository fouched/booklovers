<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import { afterLogin } from '$lib/helpers/route.helper';
	import { page } from '$app/stores'
	import messagesStores from '$lib/stores/messages.stores';

	const login = async () => {
		try {
			const user = await loginWithGoogle()
			await afterLogin($page.url, user.uid)
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
