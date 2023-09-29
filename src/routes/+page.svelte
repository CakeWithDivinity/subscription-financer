<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Link from '$lib/ui/Link.svelte';
</script>

<div class="hero">
	<h1>{$_('hero.heading')}</h1>
	<p>{$_('hero.subtitle')}</p>
	<div>
		<Link href="/register">{$_('hero.signUpButton')}</Link>
		<Link type="text" href="/login">{$_('auth.existingAccount')}</Link>
	</div>
</div>

<style lang="scss">
	.hero {
		height: 100%;
		display: flex;
		gap: 1.5rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	h1 {
		color: var(--accent);
		font-size: 2.5rem;
	}

	p {
		font-weight: bold;
		font-size: 1.25rem;
	}
</style>
