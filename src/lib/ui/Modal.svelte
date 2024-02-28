<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import { _ } from 'svelte-i18n';
	import Button from './Button.svelte';

	export let isOpen: boolean;
	export let message: string;
	export let onConfirm: () => void;
	export let labels = { cancel: 'confirmModal.cancel', confirm: 'confirmModal.ok' };
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<p>{message}</p>
			<div class="actions">
				<Button on:click={closeModal}>{$_(labels.cancel)}</Button>
				<Button on:click={onConfirm} isDestructive={true}>{$_(labels.confirm)}</Button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.contents {
		background-color: var(--secondary);
		padding: 2rem;
		border-radius: 5px;
		text-align: center;
	}

	.actions {
		display: flex;
		gap: 1rem;
	}
</style>
