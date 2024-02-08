import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(307, '/login');
	}

	return {
		expenses: prisma.expense.findMany({ where: { user: { email: session.user.email } } })
	};
};
