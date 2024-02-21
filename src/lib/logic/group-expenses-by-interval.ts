import type { ExpenseInterval, Expense } from '@prisma/client';

export type GroupedExpenses = {
	[key in ExpenseInterval]: Expense[];
};

export function groupExpensesByInterval(expenses: Expense[]): GroupedExpenses {
	return expenses.reduce(
		(acc, expense) => {
			acc[expense.interval].push(expense);

			return acc;
		},
		{
			monthly: [],
			quaterly: [],
			yearly: [],
			custom: []
		} as GroupedExpenses
	);
}
