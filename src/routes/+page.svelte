<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="hero">
	<h1>{$_('hero.heading')}</h1>
	<p>{$_('hero.subtitle')}</p>
	<button>{$_('hero.button')}</button>
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

	button {
		background-color: var(--primary);
		border: none;
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--text);
		padding: 0.75rem 3ch;
		border-radius: 10px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

		&:active {
			box-shadow: none;
			transform: translateY(0.1rem);
		}
	}
</style>
