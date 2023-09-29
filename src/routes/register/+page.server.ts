import { fail, type Actions, redirect } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/auth/hash-password';
import prisma from '$lib/prisma';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		const retypePassword = formData.get('retypePassword');

		if (!email || !password || !retypePassword) {
			return fail(400, { email, missingFields: true });
		}

		if (password !== retypePassword) {
			return fail(400, { email, mismatch: true });
		}

		const existingUser = await prisma.user.findFirst({ where: { email: email.toString() } });
		if (existingUser) {
			return fail(400, { existing: true });
		}

		try {
			const { hash, salt } = await hashPassword(password.toString());
			await prisma.user.create({
				data: { email: email.toString(), password: hash, salt }
			});
		} catch (e) {
			console.error(e);
			return fail(500);
		}

		throw redirect(303, '/login');
	}
};
