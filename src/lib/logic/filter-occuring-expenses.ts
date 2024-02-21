import type { Expense } from '@prisma/client';

/**
 * Filters a given list of expenses by whether they occur in the given `month`
 *
 * @param expenses - The expenses to filter
 * @param month - A number between 1 and 12 indicating the month to check against
 *
 * @returns The filtered list of expenses that occur in the given month
 */
export function filterOccuringExpenses(expenses: Expense[], month: number): Expense[] {
	return expenses.filter((expense) => {
		switch (expense.interval) {
			case 'monthly':
				return true;
			case 'quaterly':
				return (month - expense.monthOfPayment) % 3 === 0;
			case 'yearly':
				return expense.monthOfPayment === month;
			case 'custom': {
				if (!expense.customMonths) {
					throw new Error(
						'Expected custom interval to have `customMonths` present, but it was null'
					);
				}
				return (month - expense.monthOfPayment) % expense.customMonths === 0;
			}
		}
	});
}
