import { mdsvex } from "mdsvex";
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

const config = {
    kit: {
		adapter: adapter(),
    paths: {
    base: process.env.NODE_ENV === 'production' ? '/tablature' : '',
    }
	},
    preprocess: [
			mdsvex({
				extensions: [".md"],
      	smartypants: { dashes: "oldschool" },
			}),

		],
    extensions: [".svelte", ".md"],
};

export default config;
