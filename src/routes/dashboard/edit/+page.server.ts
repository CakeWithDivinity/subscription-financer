import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import prisma from '$lib/prisma';

let uuid = "$page.url.searchParams.get('id');";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user?.email) {
		throw redirect(307, '/login');
	}

	return {
		expenses: prisma.expense.findFirst({ where: { user: { email: session.user.email } } })
	};
};

export const actions = {
    // 2.
    publishPost: async ({ params: { id } }) => {
        await prisma.post.update({
            where: { id: Number(id) },
            data: {
                published: true,
            },
        });

        throw redirect(303, `/p/${id}`);
    },

    // 3.
    deletePost: async ({ params: { id } }) => {
        await prisma.post.delete({
            where: { id: Number(id) },
        });

        throw redirect(303, '/')
    }
} satisfies Actions;

