<script>
	import { goto } from '$app/navigation';
	import AuthForm from '$lib/components/auth/AuthForm.svelte'
	import LoginWithGoogle from '$lib/components/auth/LoginWithGoogle.svelte'
	import { loginWithEmailAndPassword } from '$lib/firebase/auth.client'
	import messageStore from '$lib/stores/messages.stores'

	// @ts-ignore
	const onLogin = async (event) => {

		const formData = new FormData(event.target)
		const email = formData.get('email')
		const password = formData.get('password')

		try {
						
			// @ts-ignore
			const user = await loginWithEmailAndPassword(email, password)
			goto('/')

		} catch (e) {
			// @ts-ignore
			if (['auth/missing-password', 'auth/invalid-credential', ].includes(e.code)) {
				messageStore.showError('Invalid email or password')
				return
			}

			console.log(e)
			messageStore.showError()
		}
	}
</script>

<div class="row">
	<div class="col">
		<h1>Login</h1>
	</div>
</div>
<hr/>
<AuthForm on:submit={onLogin} btnName="Login" />
<hr/>
<LoginWithGoogle />
<hr/>
<div class="row">
	<div class="col">
		<a href="/forgot-password" class="btn btn-warning w-100">Forgot Password</a>
	</div>
</div>


<svelte:head>
	<title>Book Lovers - Login</title>
</svelte:head>

