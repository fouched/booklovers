<script>
	import { page } from '$app/stores'
	import { goto } from '$app/navigation';
	import AuthForm from '$lib/components/auth/AuthForm.svelte'
	import LoginWithGoogle from '$lib/components/auth/LoginWithGoogle.svelte'
	import { registerWithEmailAndPassword } from '$lib/firebase/auth.client';
	import messageStore from '$lib/stores/messages.stores'
	import { afterLogin } from '$lib/helpers/route.helper';

	// @ts-ignore
	const register = async (event) => {
		
		const formData = new FormData(event.target)
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()

		try {

			if (!email || !password) {
				messageStore.showError('Please enter a valid email and password')
				return
			}

			if (password.length < 6) {
				messageStore.showError('Password must be 6 characters or more')
				return
			}

			const user = await registerWithEmailAndPassword(email, password)
			await afterLogin($page.url, user.uid)				

		} catch (/** @type {any} */ e) {
			if (e.code === 'auth/email-already-in-use') {
				messageStore.showError('You are already registered, please log in')
				await goto('/login')
				return 
			}
			console.log(e)
			messageStore.showError()
		}

	}
</script>
<div class="row">
	<div class="col">
		<h1>Sign Up</h1>
	</div>
</div>
<hr/>
<AuthForm on:submit={register} btnName="Sign Up!" />
<hr/>
<LoginWithGoogle />

<svelte:head>
	<title>Book Lovers - Sign Up</title>
</svelte:head>

