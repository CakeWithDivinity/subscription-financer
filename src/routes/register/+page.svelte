<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Link from '$lib/ui/Link.svelte';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import { enhance } from '$app/forms';

	export let form;
</script>

<form method="POST" use:enhance>
	<h1>{$_('auth.register')}</h1>
	<Input
		name="email"
		type="email"
		placeholder="john.doe@gmail.com"
		required
		value={form?.email}
		error={form?.existing ? $_('auth.existingEmail') : undefined}
	>
		{$_('auth.email')}
	</Input>
	<Input name="password" type="password" required>{$_('auth.password')}</Input>
	<Input
		name="retypePassword"
		type="password"
		required
		error={form?.mismatch ? $_('auth.mismatch') : undefined}>{$_('auth.retypePassword')}</Input
	>
	<div class="actions">
		<Button type="submit">{$_('auth.register')}</Button>
		<Link href="/login" type="text">{$_('auth.existingAccount')}</Link>
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
