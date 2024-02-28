<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { openModal, closeModal } from 'svelte-modals';
	import ConfirmModal from '$lib/ui/Modal.svelte';
	import ExpenseForm from '$lib/ui/ExpenseForm.svelte';
	import Button from '$lib/ui/Button.svelte';

	let deleteform: HTMLFormElement;

	function handleDelete() {
		openModal(ConfirmModal, {
			message: $_('edit.delete.confirmQuestion'),
			labels: {
				cancel: $_('edit.delete.cancel'),
				confirm: $_('edit.delete.confirm')
			},
			onConfirm: () => {
				console.log('confirmed deletion');
				deleteform.submit();
				closeModal();
			}
		});
	}
	export let data;
</script>

<form bind:this={deleteform} method="POST" action="?/deleteExpense" />

<div class="edit-wrapper">
	<ExpenseForm formData={data.expense} action={'?/updateExpense'} />

	<Button on:click={handleDelete} isDestructive={true}>{$_('edit.actions.delete')}</Button>
</div>

<style lang="scss">
	.edit-wrapper {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
