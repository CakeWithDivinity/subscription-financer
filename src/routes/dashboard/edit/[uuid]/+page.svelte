<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import RadioSelect from '$lib/ui/RadioSelect.svelte';
	import Select from '$lib/ui/Select.svelte';
	import { _ } from 'svelte-i18n';

	export let data;
</script>

<pre>
    <code>
      {JSON.stringify(data.expenses)}
    </code>
  </pre>

<form method="POST" action="?/deleteExpense">
	<div class="action">
		<Button type="submit">{$_('edit.save')}</Button>
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
