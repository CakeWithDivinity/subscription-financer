<script lang="ts">
	import type { Expense } from '@prisma/client';
	import { _ } from 'svelte-i18n';
	import { calculateMonthlyExpense } from '$lib/logic/monthly-expense-calculation';

	export let expenses: Expense[];
	let costPerMonth: number;

	$: costPerMonth = calculateMonthlyExpense(expenses);
</script>

<div class="summary-wrapper">
	<h2 class="summary">{costPerMonth.toFixed(2)}€</h2>
	<h2 class="per-month">{$_('expenseSummary.perMonth')}</h2>
	<p>{$_('expenseSummary.infoText')}</p>
</div>

<style lang="scss">
	.summary-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-top: 2rem;
	}

	.summary {
		font-size: 2.5rem;
		color: var(--accent);
	}

	.per-month {
		font-size: 2rem;
	}

	p {
		margin-top: 0.75rem;
		opacity: 0.8;
		font-size: 0.9rem;
	}
</style>
