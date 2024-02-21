<script lang="ts">
	import ExpenseList from '$lib/ui/ExpenseList.svelte';
	import ExpenseSummary from '$lib/ui/ExpenseSummary.svelte';
	import MonthlyExpenseView from '$lib/ui/MonthlyExpenseView.svelte';
	import NoExpensesDisclaimer from '$lib/ui/NoExpensesDisclaimer.svelte';

	export let data;
</script>

{#if !data.expenses.length}
	<NoExpensesDisclaimer />
{:else}
	<ExpenseSummary expenses={data.expenses} />
	<MonthlyExpenseView expenses={data.expenses} />
	<ExpenseList expenses={data.expenses} />
{/if}
