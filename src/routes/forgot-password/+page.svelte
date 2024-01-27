<script>
	import AuthForm from '$lib/components/auth/AuthForm.svelte'
	import { sendPasswordReset } from '$lib/firebase/auth.client'
	import messageStore from '$lib/stores/messages.stores'

	let showForm = true
	// @ts-ignore
	const onForgotPassword = async (event) => {

		const formData = new FormData(event.target)
		const email = formData.get('email')

		try {
			// @ts-ignore
			sendPasswordReset(email)
			showForm = false
			messageStore.showSuccess('Reset email sent')
		} catch (error) {
			console.log(error)
		}

	}
</script>

<div class="row">
	<div class="col">
		<h1>Forgot Password</h1>
	</div>
</div>

{#if showForm }
<AuthForm on:submit={onForgotPassword} btnName="Forgot Password" showPassword={false} />
{/if}

<svelte:head>
	<title>Book Lovers - Forgot Password</title>
</svelte:head>

