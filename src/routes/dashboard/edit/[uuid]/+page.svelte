<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import RadioSelect from '$lib/ui/RadioSelect.svelte';
	import Select from '$lib/ui/Select.svelte';
	import { _ } from 'svelte-i18n';
	import { openModal, closeModal } from 'svelte-modals';
	import ConfirmModal from '$lib/ui/Modal.svelte';

	function handleDelete() {
		openModal( ConfirmModal,
			{
				message: 'Are you sure you want to delete this entry?',
				labels: {
					cancel: "No",
					confirm: "Yes"
				},
				onConfirm: () => {
            	console.log('confirmed deletion');
				closeModal()
          }
		})
	}

	export let data;
</script>

<pre>
    <code>
      {JSON.stringify(data.expenses)}
    </code>
</pre>

<!--
  <form method="POST" action="?/updateExpense">
	  <div class="action">
		  <Button type="submit">{$_('edit.save')}</Button>
	  </div>
  </form>
-->

<button on:click={handleDelete}>Open Modal</button>

<form method="POST" action="?/deleteExpense">
	<div class="action">
		<Button type="submit">{$_('edit.delete')}</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		min-height: 100%;
	}

	h1 {
		text-align: center;
	}

	.action {
		margin-top: auto;
	}

	.custom-label {
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	.custom-interval {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: min-content;
		min-width: 12rem;
	}
</style>
