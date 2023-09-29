import { browser } from '$app/environment';
import '../i18n';
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	if (browser) {
		locale.set(window.navigator.language);
	}
	await waitLocale();

	return { session: event.data.session };
};
