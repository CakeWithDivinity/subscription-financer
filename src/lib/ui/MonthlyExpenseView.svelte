<script lang="ts">
	import type { Expense } from '@prisma/client';
	import { _ } from 'svelte-i18n';
	import { filterOccuringExpenses } from '$lib/logic/filter-occuring-expenses';
	import { groupExpensesByInterval } from '$lib/logic/group-expenses-by-interval';
	import RadioSelect from './RadioSelect.svelte';
	import { getMonthRadioSelectOptions } from '$lib/logic/get-month-radio-select-options';

	const monthRadioSelectOptions = getMonthRadioSelectOptions();

	export let expenses: Expense[];

	let expenseTableData: Expense[][];
	let selectedMonth = monthRadioSelectOptions[1].value;

	$: expenseTableData = Object.values(
		groupExpensesByInterval(filterOccuringExpenses(expenses, selectedMonth))
	).filter((entry) => entry.length);
</script>

<div class="monthly-view-wrapper">
	<h2>{$_('monthlyExpenseView.title')}</h2>
	<RadioSelect options={monthRadioSelectOptions} name="month" bind:value={selectedMonth} />

	<div class="grid">
		<p class="table-heading">{$_('monthlyExpenseView.type')}</p>
		<p class="table-heading">{$_('monthlyExpenseView.name')}</p>
		<p class="table-heading">{$_('monthlyExpenseView.amount')}</p>
		{#each expenseTableData as expenseGroup, i}
			{#each expenseGroup as expense (expense.id)}
				<p class="interval">{expense.interval}</p>
				<p class="name">{expense.name}</p>
				<p class="amount">{expense.amount}€</p>
			{/each}

			{#if i < expenseTableData.length - 1}
				<hr />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.monthly-view-wrapper {
		margin-top: 5rem;
	}

	.grid {
		display: grid;
		width: 100%;
		grid-template-columns: auto 1fr auto;
		column-gap: 2ch;
		row-gap: 0.5rem;
		margin-top: 1rem;

		hr {
			grid-column: 1 / -1;
		}
	}

	.interval {
		text-transform: capitalize;
	}

	.table-heading {
		opacity: 0.6;
		font-weight: bold;
	}

	.name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.amount {
		justify-self: end;
	}
</style>
