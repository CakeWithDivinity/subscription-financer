<script lang="ts">
	import ExpenseForm from '$lib/ui/ExpenseForm.svelte';
</script>

<div class="create-wrapper">
	<ExpenseForm />
</div>

<style lang="scss">
	.create-wrapper {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
