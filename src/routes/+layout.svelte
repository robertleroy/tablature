<script>
  import { dev } from "$app/environment";
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { cookieNames, store } from "$lib";
  import { dev_icon, guitar, favicon } from "$lib/assets";
  import { Menu, Textbox } from "$lib/components";
  import tabData from '$lib/data/tabs.json';
  import '@fontsource-variable/open-sans';
  import '@fontsource-variable/source-code-pro';
  import "./app.css";

  const appName = "Tablature";
  let tabs = $state(tabData);
  
  let { data, children } = $props();
  let appWidth = $state(0);
  let showmenu = $state(false);
  let darkmode = $state(false);

  let searchterm = $state(""),
    selectedTuning = $state();

  let filteredTabs = $derived.by(() => {
    let list = tabs;
    // 1. Filter by Tuning
    if (selectedTuning) {
      list = list.filter((el) => el.tuning.toLowerCase() === selectedTuning.toLowerCase());
    }
    // 2. Filter by Search Term
    if (searchterm) {
      const term = searchterm.toLowerCase();
      list = list.filter((el) => el.title.toLowerCase().includes(term));
    }
    // 3. Sort Alphabetically
    return list.sort((a, b) => a.title.localeCompare(b.title));
  });

  let groupedTabs = $derived.by(() => {
    // 1. Get unique artist names
    const artistNames = [...new Set(tabs.map((el) => el.artist_display))].sort();
    // 2. Map those names into your { group, tabs } structure
    return artistNames.map((name) => ({
      group: name,
      tabs: tabs.filter((el) => el.artist_display === name),
    }));
  });

  let tunings = $derived.by(() => {
    let arr = ["Standard", ...[...new Set(tabs.map((el) => el.tuning))].filter((el) => el !== "Standard").sort()];
    return arr;
  });


  $effect(() => {
    if (appWidth > 900 && showmenu === true) showmenu = false;
  });

  onMount(() => {
    /* check data-theme attribute */
    const dataset_theme = document.documentElement.dataset.theme;

    if (dataset_theme) {
      /* set toggle variable */
      darkmode = dataset_theme === "dark";
      return;
    }

    /* check browser prefs, set theme */
    const browserPrefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    darkmode = browserPrefDark;
    set_theme(darkmode);
  });

  /* set cookie */
  function set_theme(isDark = false) {
    const exp = 60 * 60 * 24 * 365; /*** 1yr ***/
    const val = isDark ? "dark" : "light";

    document.cookie = `${cookieNames.theme}=${val}; max-age=${exp}; path=/; SameSite=Strict`;
    document.documentElement.dataset.theme = val;
  }
</script>

<svelte:head>
  <title>{appName}{dev ? " : dev" : ""}</title>
  {#key darkmode}
    <link rel="icon" href={dev ? favicon : guitar} />
  {/key}
</svelte:head>

<header bind:clientWidth={appWidth}>
  <div class="inner">
    <a href="/" class="logo unset"
      onclick={() => {
        if (appWidth < 800 && showmenu) showmenu = false;
        store.selectedGroup = null;
        store.selectedTab = null;
        selectedTuning = "";
        searchterm = "";
      }}>
      <!-- <span>{@render guitar_snip()}</span> -->
      <span>
        {appName} 
        {dev ? " : " + appWidth : ""}
      </span>
    </a>

    <button
      class="menu unset"
      onclick={() => showmenu = !showmenu } >
      <Menu toggled={showmenu} />
    </button>
  </div>
</header>

<aside class="sidebar">
  <div class="inner">
    <nav>{@render nav()}</nav>
  </div>
</aside>

<main>
  <div class="router">
    {#key data?.pathname}
      <div class="page" transition:fade={{ duration: 200 }}>
        {@render children()}
      </div>
    {/key}
  </div>
</main>

{#if appWidth < 900 && showmenu}
  <menu class="offcanvas" transition:slide={{ duration: 300 }}>
    <nav>{@render nav()}
    </nav>
  </menu>

  <button
    class="shade unset"
    transition:fade={{ duration: 1000 }}
    onclick={() => {
      if (showmenu) showmenu = false;
    }}
    aria-label="panel">
  </button>
{/if}

{#snippet nav()}
  <div class="filters">
    <Textbox bind:value={searchterm}
      placeholder="filter by title.."
      oninput={() => {
        if (selectedTuning) selectedTuning = "";
    }}/>

    <select bind:value={selectedTuning}
      onchange={() => {
        searchterm = "";
    }}>
      <option value="">filter by {selectedTuning ? "band" : "tuning"}...</option>
      {#each tunings as tuning}
        <option value={tuning}>{tuning}</option>
      {/each}
    </select>
  </div>

  {#if searchterm.length || selectedTuning}
    {#each filteredTabs as tab}
      <button class="tab unset"       
        onclick={() => {
          store.selectedGroup = tab.artist_display;
          store.selectedTab = tab;
          if (showmenu === true) { showmenu = false; } 
      }}>
        <span class:active={store.selectedTab === tab}>
          {tab.title}</span>
      </button>
    {/each}
  {:else}
    {#each groupedTabs as item}
      <button class="group unset"
        onclick={() => {
          // toggle selectedGroup & clear selectedTab
          if (store.selectedGroup === item?.group) {
            store.selectedGroup = null;
          } else { store.selectedGroup = item?.group; }
      }}> 
        <span>{item.group}</span>
      </button>

      {#if store.selectedGroup === item?.group}
        <div class="groupPanel" transition:slide={{ duration: 250 }}>
          {#each item.tabs as tab}
            <button class="tab unset"
              class:selected={store.selectedTab == tab}
              onclick={() => {
                store.selectedTab = tab;
                if (showmenu === true) {
                  showmenu = false;
                }
            }}>
              <span class:active={store.selectedTab === tab} >
          {tab.title}</span>
            </button>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}

  <!-- {#each {length: 20} as item, i}
  <div class="item">Item {i}</div>
  {/each} -->
{/snippet}

{#snippet guitar_snip()}
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
  height="1em">
    <path
      d="M15.227 7.334c-.95-.744-2.004-1.231-3.058-1.418-1.347-.237-2.758.038-3.732 1.01-.584.585-.897 1.267-1.088 1.86a1 1 0 0 0-.038.167c-.133.942-.303 1.185-.512 1.34s-.748.304-1.72.443l-.023.003c-1.054.174-2.385.516-3.455 1.586-2.453 2.453-1.988 6.646.72 9.354s6.9 3.173 9.354.72c1.07-1.07 1.412-2.4 1.586-3.455l.003-.023c.14-.972.289-1.51.444-1.72s.397-.38 1.339-.513a1 1 0 0 0 .167-.037c.592-.19 1.274-.504 1.858-1.088.652-.652 1-1.517 1.076-2.405a1.02 1.02 0 0 0-1.036-1.106 1.53 1.53 0 0 1-1.118-.447 1.5 1.5 0 0 1-.3-.42l-1.472 1.473a3.46 3.46 0 0 0 1.535 1.173c-.056.083-.052.22-.124.292-.272.272-.598.439-.984.568-1.13.176-2.031.56-2.579 1.303-.562.762-.673 1.616-.818 2.617-.15.903-.39 1.723-1.017 2.349-1.52 1.52-4.414 1.341-6.475-.72s-2.24-4.956-.72-6.476c.62-.62 1.432-.864 2.327-1.014l.022-.003c1.001-.143 1.855-.256 2.617-.817.742-.548 1.127-1.45 1.303-2.58.129-.385.295-.711.568-.983.417-.419 1.07-.6 1.938-.446.582.103 1.217.532 1.837.988zM5.861 15.26l2.878 2.878-.72.72-2.877-2.879zM19.534 1.588l.36.36-.36.36-.36-.36zm.72-.72.359.36-.36.36-.36-.36zm.719-.719.36.36-.36.36-.36-.36zm1.08 3.958.359.359-.36.36-.36-.36zm.72-.72.358.36-.359.36-.36-.36zm.719-.72.359.36-.36.36-.36-.36zM22.412.149a.51.51 0 0 0-.72 0l-2.518 2.518a.51.51 0 0 0 0 .72l1.439 1.438a.51.51 0 0 0 .72 0l2.518-2.518a.51.51 0 0 0 0-.72zm-.36 1.079.72.72-1.799 1.799-.72-.72zm-2.877 2.158 1.439 1.44-9.715 9.714-1.44-1.439zm-7.557 11.875a2.035 2.035 0 0 1-2.878 0 2.035 2.035 0 0 1 0-2.878 2.035 2.035 0 0 1 2.878 0 2.035 2.035 0 0 1 0 2.878"
    />
  </svg>
{/snippet}

<style>
  .selected {
    background: hsl(0 0 0 / 0.1);
  }
</style>
