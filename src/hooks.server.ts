import prisma from '$lib/prisma';
import { verifyPassword } from '$lib/server/auth/verify-password';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { locale } from 'svelte-i18n';

const getLanguage: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];

	if (lang) {
		locale.set(lang);
	}

	return resolve(event);
};

const auth = SvelteKitAuth({
	pages: {
		error: '/login'
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async ({ email, password }) => {
				if (typeof email !== 'string' || typeof password !== 'string') {
					return null;
				}

				const user = await prisma.user.findFirst({ where: { email } });
				if (!user) {
					return null;
				}

				const isPasswordCorrect = await verifyPassword(password, user.password);
				if (!isPasswordCorrect) {
					return null;
				}

				return {
					id: user?.id.toString(),
					email: user?.email
				};
			}
		})
	]
});

export const handle = sequence(auth, getLanguage);
