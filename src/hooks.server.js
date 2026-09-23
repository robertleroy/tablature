// import * as auth from '$lib/server/auth';import * as auth from '$lib/server/auth';
// import { sequence } from '@sveltejs/kit/hooks';
// import { fail, redirect } from '@sveltejs/kit';
import { cookieNames } from "$lib";





const handleTheme = async ({ event, resolve }) => {
  // Check for a saved theme cookie
	const theme = event.cookies.get(cookieNames.theme);

  // if not: defer to onMount
  if (!theme) {
    return await resolve(event);
  }

  // else: set cookie value on data-theme attribute
	return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    },
  });
}

export const handle = handleTheme;
