import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import prisma from '$lib/prisma';

const createExpenseSchema = z.object({
	name: z.string().min(1).trim(),
	interval: z.enum(['monthly', 'quaterly', 'yearly', 'custom']),
	customMonths: z.coerce.number().min(1).optional(),
	monthOfPayment: z.coerce.number().min(1).max(12),
	amount: z.coerce.number().min(1)
});

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.getSession();

		if (!session?.user?.email) {
			throw fail(401);
		}

		const formData = Object.fromEntries(await event.request.formData());
		const expenseData = createExpenseSchema.safeParse(formData);

		if (!expenseData.success) {
			return fail(400);
		}

		try {
			await prisma.expense.create({
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
			throw fail(500);
		}

		throw redirect(303, '/dashboard');
	}
};

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	if (!data.session) {
		throw redirect(307, '/login');
	}
};
