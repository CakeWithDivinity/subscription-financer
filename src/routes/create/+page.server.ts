import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

const createExpenseSchema = z.object({
	name: z.string().min(1).trim(),
	interval: z.enum(['monthly', 'quaterly', 'yearly', 'custom']),
	customMonths: z.coerce.number().min(1).optional(),
	monthOfPayment: z.coerce.number().min(1).max(12),
	amount: z.coerce.number().min(1)
});

type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());
		const expenseData = createExpenseSchema.safeParse(formData);

		if (!expenseData.success) {
			console.log(expenseData.error.format());
			return fail(400, { ...expenseData });
		}
		console.log('success');
	}
};

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	if (!data.session) {
		throw redirect(307, '/login');
	}
};
