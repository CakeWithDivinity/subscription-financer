<script lang="ts">
	import { Modals, closeModal } from 'svelte-modals';
</script>

<slot />

<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<style lang="scss">
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.75);
	}
</style>
