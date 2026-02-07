# Tablature


## Update

### Tabs App

- Add tabs as md files in `$lib/tabs`
  - template is at: `Ωμέγα/template.md`
- `npm run index` will read the files and populate  the json object at `$lib/data/tabs.json`
- Push to Github

```sh
npm run index

git add . && git commit -m "update"
git push
```

### Portainer

- Log in to `Portainer`.
- Navigate to `Stacks > tabs`
- Scroll to the `Redeploy from git repository` section.
- Click `Pull and redeploy`
- Ensure `Re-pull image` is toggled `ON`


---


## Template for next App

1. Copy this Dockerfile into the root of your new project.
2. Push to a new GitHub repo. 
3. In Portainer, create a new Stack.
4. In the Stack Editor, use the same YAML as before, but change 3001:3000 to 3002:3000.


---



## Project Summary:

A tablature library: A self-hosted Sveltekit app that uses Markdown files as the "database."

    The Data Source: Folders of .md files organized by artist.

    The Interface: A sidebar-driven UI allowing for alphabetical sorting and filtering by metadata.

    The Experience: Content is rendered in the browser to allow for future flexibility (like transposing or auto-scaling), with tabs displayed in a whitespace-preserved, monospaced format.

The Build Process Outline

Since SvelteKit handles the routing and the UI, we use a separate Node.js script (triggered by predev and prebuild) to bridge the gap between your files and the browser.

    Crawl: The script scans your /tabs source directory for .md files.

    Extract: For each file, gray-matter separates the frontmatter (metadata) from the tab body (content).

    Index Generation: * Creates a single index.json containing only metadata (title, artist, tags, id).

        This file is saved to /static/data/index.json for the Sidebar to consume.

    Content Generation: * Each tab’s content and metadata are saved into individual JSON files (e.g., /static/data/tabs/stairway-to-heaven.json).

    SvelteKit Fetching:

        Sidebar: Loads the index.json once on mount.

        Main View: When a selectedTab (Svelte 5 $state) changes, it fetches the corresponding individual JSON file from the /static folder.

Required Libraries
| Library	| Purpose	| Role | 
| --- | --- | --- |
| gray-matter	| Parses YAML frontmatter and extracts the tab text from your .md files.	| Build-time only | 
| markdown-it	| Converts the Markdown/tab text into HTML inside your Svelte components.	| Client-side | 
| fs-extra (Optional)	| Makes it easier for your build script to create/delete folders and write JSON files.	| Build-time only | 
| slugify (Optional)	| Ensures filenames like "Rock & Roll" become URL-friendly IDs like rock-and-roll.	| Build-time only | 

<br>



## Build

### Why this is a "set it and forget it" solution:

1. 2. **Automatic Updates:** Whenever you run npm run index, the tabs.json file changes. Vite (SvelteKit’s engine) will detect that change and automatically refresh your browser with the new songs.

**Type Safety (Bonus):** Even without TypeScript, modern editors like VS Code will "read" that JSON file and start giving you autocomplete suggestions for tab.artist_display or tab.tuning because it knows exactly what the data looks like.


```sh
npm run index
```

```css
<style>
  /* Use :global() if this is in +layout.svelte, 
     otherwise standard tags work in +page.svelte */
  :global(.tab-content pre) {
    font-family: 'Courier New', Courier, monospace;
    white-space: pre;       /* Keeps your spaces exactly as typed */
    overflow-x: auto;      /* Adds a scrollbar if the line is too wide */
    background: #f4f4f4;    /* Optional: subtle background for the tab */
    padding: 1rem;
    line-height: 1.2;       /* Tightens the gap between chords and lyrics */
  }
</style>
```

```svelte
<div class="tab-content">
  {@html store.selectedTab.content}
</div>
```



```sh
npm install @fontsource-variable/source-code-pro

npm install @fontsource-variable/open-sans
```

```js
import '@fontsource-variable/open-sans';
```

```css
body {
  font-family: 'Source Code Pro Variable', monospace;

  body {
  font-family: 'Open Sans Variable', sans-serif;
}
}


```