import type { Expense } from '@prisma/client';

/**
 * Calculates the average amount of money withdrawn for all given expenses
 *
 * @param expenses - The expenses to calculate the average of
 * @returns The amount of money withdrawn on average per month
 */
export function calculateMonthlyExpense(expenses: Expense[]): number {
	return expenses.reduce((total, expense) => {
		return total + expense.amount / getIntervalForExpense(expense);
	}, 0);
}

/**
 * Determines the interval in which this expense will withdraw
 * money from the bank account
 * @param expense - The expense to check
 * @returns The interval between payments in months
 */
function getIntervalForExpense(expense: Expense): number {
	switch (expense.interval) {
		case 'monthly':
			return 1;
		case 'quaterly':
			return 3;
		case 'yearly':
			return 12;
		case 'custom': {
			if (!expense.customMonths) {
				throw new Error('Expected custom interval to have `customMonths` present, but it was null');
			}
			return expense.customMonths;
		}
	}
}
