import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';
import { z } from 'zod';

/*
const saveExpenseSchema = z.object({
	name: z.string().min(1).trim(),
	interval: z.enum(['monthly', 'quaterly', 'yearly', 'custom']),
	customMonths: z.coerce.number().min(1).optional(),
	monthOfPayment: z.coerce.number().min(1).max(12),
	amount: z.coerce.number().min(1)
});

const deleteExpenseSchema = z.object({
});
*/


export const actions: Actions = {
    /*
    updateExpense: async ({ params: { uuid } }) => {
		// add usermail from sesion to query for valitation to be the right user
        await prisma.expense.update({
            where: { id: uuid },
            data: {
                name: "updated name",
            },
        });

        throw redirect(303, `/dashboard`);
    },
	*/

    deleteExpense: async ({ params: { uuid } }) => {
        // add usermail from sesion to query for valitation to be the right user
		await prisma.expense.delete({
            where: { id: uuid },
        });

        throw redirect(303, '/dashboard')
    }
};


export const load: PageServerLoad = async ({parent, params }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(307, '/login');
	}

	return {
		// todo: mail mit in query einfügen { where: { user: { email: session.user.email } } })
        expenses: prisma.expense.findMany({ 
            where: {id: params.uuid}
			}
		)
	};
};


