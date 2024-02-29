import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { z } from 'zod';

const saveExpenseSchema = z.object({
	name: z.string().min(1).trim(),
	interval: z.enum(['monthly', 'quaterly', 'yearly', 'custom']),
	customMonths: z.coerce.number().min(1).optional(),
	monthOfPayment: z.coerce.number().min(1).max(12),
	amount: z.coerce.number().min(0)
});

export const actions: Actions = {
	updateExpense: async (event) => {
		const session = await event.locals.getSession();

		if (!session?.user?.email) {
			throw fail(401);
		}

		const formData = Object.fromEntries(await event.request.formData());
		const expenseData = saveExpenseSchema.safeParse(formData);

		if (!expenseData.success) {
			return fail(400);
		}

		try {
			await prisma.expense.update({
				where: { id: event.params.uuid },
				data: {
					name: expenseData.data.name,
					amount: expenseData.data.amount,
					interval: expenseData.data.interval,
					customMonths: expenseData.data.customMonths,
					monthOfPayment: expenseData.data.monthOfPayment,
					user: { connect: { email: session.user.email } }
				}
			});
		} catch (error) {
			console.error(error);
			throw fail(500);
		}

		throw redirect(303, '/dashboard');
	},
	deleteExpense: async (event) => {
		const session = await event.locals.getSession();

		if (!session?.user?.email) {
			return fail(401);
		}

		await prisma.expense.delete({
			where: { id: event.params.uuid, user: { email: session.user.email } }
		});

		throw redirect(303, '/dashboard');
	}
};

export const load: PageServerLoad = async ({ parent, params }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(307, '/login');
	}

	const expense = await prisma.expense.findFirst({
		where: { id: params.uuid, user: { email: session.user.email } }
	});

	if (!expense) {
		throw redirect(303, '/dashboard');
	}

	return {
		expense
	};
};
