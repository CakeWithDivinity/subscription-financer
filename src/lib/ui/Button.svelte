<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
</script>

<button {type} on:click>
	<slot />
</button>

<style lang="scss">
	button {
		margin-top: 1rem;
		border: 2px solid transparent;
		color: var(--text);
		display: block;
		text-decoration: none;
		background-color: var(--primary);
		font-size: 1.25rem;
		font-weight: bold;
		padding: 0.75rem 3ch;
		border-radius: 10px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		-webkit-tap-highlight-color: transparent;
		transition: all 125ms ease;
		width: 100%;
	}
</style>
