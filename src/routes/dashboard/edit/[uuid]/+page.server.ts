import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

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

export const actions: Actions = {
    // 2.
    updateExpense: async ({ params: { uuid } }) => {
        await prisma.expense.update({
            where: { id: uuid },
            data: {
                name: "updated name",
            },
        });

        throw redirect(303, `/dashboard`);
    },

    // 3.
    deleteExpense: async ({ params: { uuid } }) => {
        await prisma.expense.delete({
            where: { id: uuid },
        });

        throw redirect(303, '/dashboard')
    }
};

