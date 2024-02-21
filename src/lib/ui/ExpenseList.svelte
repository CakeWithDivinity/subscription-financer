<script lang="ts">
	import type { Expense } from '@prisma/client';
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import Link from './Link.svelte';
	import { MONTHS } from '$lib/logic/months';
	import { groupExpensesByInterval } from '$lib/logic/group-expenses-by-interval';

	export let expenses: Expense[];

	let groupedExpenses = groupExpensesByInterval(expenses);
</script>

<div class="expense-list">
	<div class="header">
		<h2>{$_('expenseList.title')}</h2>
		<Link slim href="/create">{$_('expenseList.create')}</Link>
	</div>

	<div class="grid">
		{#each Object.entries(groupedExpenses) as group}
			{#if group[1].length}
				<p class="interval-heading">{$_('create.intervals.' + group[0])}</p>
				<p class="table-heading">{$_('expenseList.start')}</p>
				<p class="table-heading">{$_('expenseList.name')}</p>
				<p class="table-heading">{$_('expenseList.amount')}</p>
				<p />

				{#each group[1] as expense}
					<p class="month">{$_('create.months.' + MONTHS[expense.monthOfPayment]).slice(0, 3)}</p>
					<p class="name">{expense.name}</p>
					<p class="amount">{expense.amount}€</p>
					<a class="edit" href="/dashboard/edit/{expense.id}"><Icon icon="ic:baseline-edit" /></a>
				{/each}
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.expense-list {
		margin-top: 5rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.grid {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		column-gap: 1rem;
		align-items: center;
	}

	.interval-heading {
		font-weight: bold;
		opacity: 0.6;
		text-decoration: underline;
		grid-column: 1 / -1;
		justify-self: center;
		margin-top: 1rem;
	}

	.table-heading {
		font-weight: bold;
		opacity: 0.6;
	}

	.month {
		text-transform: uppercase;
	}

	.name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.amount {
		text-align: end;
	}

	.edit {
		background: none;
		color: var(--text);
		border: none;
		font-size: 1.5rem;
	}
</style>
