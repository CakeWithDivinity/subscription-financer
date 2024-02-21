<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Link from './Link.svelte';
</script>

<div class="disclaimer">
	<h1>{$_('noExpensesDisclaimer.title')}</h1>
	<Link href="/create">{$_('noExpensesDisclaimer.button')}</Link>
</div>

<style lang="scss">
	h1 {
		text-align: center;
		color: var(--accent);
	}

	.disclaimer {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
	}
</style>
