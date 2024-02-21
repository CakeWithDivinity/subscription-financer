<script lang="ts">
	import ExpenseSummary from '$lib/ui/ExpenseSummary.svelte';
	import NoExpensesDisclaimer from '$lib/ui/NoExpensesDisclaimer.svelte';

	export let data;
</script>

{#if !data.expenses.length}
	<NoExpensesDisclaimer />
{:else}
	<ExpenseSummary expenses={data.expenses} />
{/if}
