<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Link from '$lib/ui/Link.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import { signIn } from '@auth/sveltekit/client';

	let email = '';
	let password = '';

	const login = (event: Event) => {
		event.preventDefault();
		signIn('credentials', {
			email,
			password,
			callbackUrl: '/'
		});
	};
</script>

<form method="POST">
	<h1>{$_('auth.login')}</h1>
	<Input name="email" type="email" placeholder="john.doe@gmail.com" bind:value={email} required>
		{$_('auth.email')}
	</Input>
	<Input name="password" type="password" bind:value={password} required>
		{$_('auth.password')}
	</Input>
	<div class="actions">
		<Button type="submit" on:click={login}>
			{$_('auth.login')}
		</Button>
		<Link href="/register" type="text">{$_('auth.noAccount')}</Link>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 0.75rem;
	}

	h1 {
		margin-bottom: 0.5rem;
		text-align: center;
		color: var(--accent);
	}

	.actions {
		display: flex;
		flex-direction: column;
	}
</style>
