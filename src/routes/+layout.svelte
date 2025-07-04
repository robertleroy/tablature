<script>
  
  import { base } from '$app/paths';

  import { dev } from '$app/environment';
  import { onMount, setContext } from "svelte";
  import { fade, fly } from 'svelte/transition';
  import { titlecase, tabs, Menu, DarkToggle, Accordion}  from "$lib";
  import "./app.css";


  const tunings = getUniqueProperties(tabs, "tuning");
  let appName = $state("Tablature"),
      innerWidth = $state(0),
      pageWidth = $state(0),
      sidebarOpen = $state({value: false}),
      debug = $state(false),
      darkmode = $state(false),
      { children } = $props();

  let searchterm = $state(""),
      ctx = $state({
        selectedGroup: null,
        selectedTab: null,
      }),
      selectedTuning= $state(),
      sortBy = $state("groups");

  setContext('ctx', ctx);

  // console.log("tunings", tunings);

  const groups = [...new Set(tabs.map(el => el.artist_display))].sort();
  // const tunings = [...new Set(tabs.map(el => el.tuning))].sort();

  // let tabsByTuning = $derived.by(() => {
  //   if (selectedTuning) {
  //     return tabs.filter(el => el.tuning == selectedTuning);
  //   }
  //   return tabs;
  // });


  let sortedTabs = $derived.by(() => {
    let arr = selectedTuning ?
      tabs.filter(el => el.tuning.toLowerCase() === selectedTuning.toLowerCase()) : tabs;

    return arr.sort((a,b) => a.title.localeCompare(b.title))
  });


  // const sortedTabs = tabs.sort((a,b) => a.title.localeCompare(b.title));

  // const sortedTabs = () => {
  //   let arr = selectedTuning ? tabs.filter(el => el.tuning == selectedTuning) : tabs;
  //   return arr.sort((a,b) => a.title.localeCompare(b.title));
  // }

  //   let sortedTabs = $derived.by(() => {
  //   let arr = selectedTuning ? tabs.filter(el => el.tuning == selectedTuning) : tabs;
  //   return arr.sort((a,b) => a.title.localeCompare(b.title))
  // });
  
  // console.log(selectedTuning,tabsByTuning);

  // function tabsByTuning() {
  //   if (selectedTuning) {
  //     return tabs.filter(el => el.tuning == selectedTuning);
  //   }
  //   return tabs;
  // }

  // console.log(tabsByTuning());

  // initContext();
  // function initContext() {
  //   setContext('selectedArtist', selectedGroup);
  //   setContext('selectedTab', selectedTab);
  // }

  // Context data to Treenode
  // setContext('sidebarOpen', sidebarOpen);  

  $effect(() => {
    // console.log(sortedTabs.filter(el => el.artist_display === ctx.selectedGroup));
    if (innerWidth > 840) sidebarOpen.value = false;
  })

function getUniqueProperties(arr, prop = 'tags') {
  const allTags = arr
    .flatMap(obj => obj[prop] || [])
    .filter(tag => tag != null); // Remove null/undefined values
  
  return [...new Set(allTags)];
}
// function filterTunings() {

//   let arrByTuning = tabs.filter(el => el.tuning == selectedTuning);
//   console.log(selectedTuning,arrByTuning);
// }

  // onMount(() => {
  //   const dataset_theme = document
  //     .documentElement.dataset.theme;      
    
  //   if (dataset_theme) {
  //     darkmode = dataset_theme == "dark";
  //     return;
  //   } 
  //   const browserPrefDark = window.matchMedia(
  //     '(prefers-color-scheme: dark)'
  //   ).matches;
  //   darkmode = browserPrefDark;
  //   set_theme(darkmode);
  // })

  // function set_theme(isDark = false) {
  //   const exp = 60 * 60 * 24 * 365; /*** 1yr ***/
  //   const val = isDark ? "dark" : "light";
    
  //   document.cookie = `theme=${val}; max-age=${exp}; path=/; SameSite=Strict`;
  //   document.documentElement.dataset.theme = val;
  // }

    onMount(() => {
      const theme = localStorage.getItem('theme');

      console.log("theme", theme);

      if (theme === "dark") { darkmode = true; }

      
    // const dataset_theme = document
    //   .documentElement.dataset.theme;      
    
    // if (dataset_theme) {
    //   darkmode = dataset_theme == "dark";
    //   return;
    // } 
    // const browserPrefDark = window.matchMedia(
    //   '(prefers-color-scheme: dark)'
    // ).matches;
    // darkmode = browserPrefDark;
    // set_theme(darkmode);
  })

  function set_theme(isDark = false) {

    console.log("set_theme", isDark);
    const themeValue = isDark ? "dark" : "light";
    localStorage.setItem('theme', themeValue);

    
  }
</script>

<svelte:window bind:innerWidth />
<!-- <svelte:document class:darkmode /> -->

<svelte:head>
  <title>{dev ? appName + ": develpoment" : appName}</title>
</svelte:head>

<div class="app" class:darkmode={darkmode}>
    
  <header>
    <div class="flex" bind:clientWidth={pageWidth}>

      <span>
      {#if innerWidth < 840}
      <Menu open={sidebarOpen.value}
        onclick={() => sidebarOpen.value = !sidebarOpen.value}/>
      {/if}
      
      <button class="title unset"
        onclick={() => {
          // unset ctx
          ctx.selectedGroup = null;
          ctx.selectedTab = null;
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="fill: gainsboro; mix-blend-mode: difference;">
          <path d="M18.8 33.2 9.6 24l9.2-9.2L16 12 4 24l12 12Zm10.4 0 9.2-9.2-9.2-9.2L32 12l12 12-12 12Z"/>
        </svg>
        <h1 class="h3">{dev ? appName + ":dev " : appName}</h1>
      </button>
      </span>

      <div class="banner">      
        {ctx.selectedGroup ? titlecase(ctx.selectedGroup) : ""}
        {@html ctx.selectedTab ? ": &nbsp;" +  titlecase(ctx.selectedTab.title) : ""}
      </div>

      {#if debug}
      <div>
        {innerWidth} / 
        {pageWidth} 
      </div>
      {/if}

      <div class="flex">
        <div class="route">
          <a href="{base}/">Home</a>
          &nbsp;
          <a href="{base}/about">About</a>
        </div>
        <DarkToggle {darkmode} onclick={() => {
          darkmode = !darkmode;
          set_theme(darkmode);
        }} />
      </div>

    </div>
  </header>

  {#if sidebarOpen.value || innerWidth >= 840}
  <aside transition:fly={{duration: 500, x: "-100%", opacity: 1}}>

    <nav class="sidenav">
      <!-- search filter -->
      <div class="textbox">
        <input type="text" 
          placeholder="filter by title.."
          bind:value={searchterm}>

        {#if searchterm.length}
        <button class="unset" transition:fade={{duration:100}}
          onclick={() => searchterm = ""}>🞫</button>
        {/if}
      </div>

      <div class="tunings">
        <select  bind:value={selectedTuning} onchange={() => console.log(sortedTabs)} style:width="180px"> 
          <option value="" hidden >filter by tuning...</option>
          <option value="">All Songs</option>
          {#each tunings as tuning}
          <option value={tuning}>{titlecase(tuning)}</option>
          {/each}
        </select>
        <!-- {selectedTuning} -->
      </div>

      <div class="list">
        
        {#if searchterm.length || selectedTuning !== ""}
          <!-- Filtered List -->
          {#each sortedTabs.filter(el => el.title.toLowerCase().includes(searchterm.toLowerCase())) as tab}
          <button class="tab unset" 
            class:selected={ctx?.selectedTab && 
              tab.id == ctx?.selectedTab.id}
            onclick={() => {
              ctx.selectedGroup = tab.artist_display
              ctx.selectedTab = tab
            }}>
            {tab.title}
          </button>
          {/each}
        
        {:else}
        
          <!-- Grouped List -->
          {#each groups as group, i}
          <Accordion folder={titlecase(group)} 
            onclick={() => {
              ctx.selectedGroup = group;
              ctx.selectedTab = null;
            }} 
            selected={ctx.selectedGroup === group}>

            <!-- Group Children -->
            {#each sortedTabs.filter(el => el.artist_display === group) as tab}
            <button class="tab unset"
              class:selected={ctx?.selectedTab && 
                tab.id == ctx?.selectedTab.id}
              onclick={() => {
                ctx.selectedTab = tab;
                if (sidebarOpen.value === true) {
                  sidebarOpen.value = false;
                }
              }}>
              {titlecase(tab?.title)}
            </button>  
            {/each}
          </Accordion>
          {/each}
        
        {/if}
      </div>

      <br><br><br>

      <!-- <small >Group by</small><br> // sortBy
      <select bind:value={sortBy}>
        <option value="groups">Artist</option>
        <option value="all">Song</option>
        <option value="tuning">Tuning</option>
      </select>

      <div>
        <label>
          <input type="radio" value="groups" bind:group={sortBy}>
          Artist
        </label>
        <label>
          <input type="radio" value="all" bind:group={sortBy}>
          Song
        </label>
        <label>
          <input type="radio" value="tuning" bind:group={sortBy}>
          Tuning
        </label>
      </div>
      <div>{sortBy}</div> -->
    </nav>
  </aside>
  {/if}

  <main>
    {#key ctx?.selectedTab}
    <div class="router" 
      transition:fade={{duration: 200}}>
        <div class="page">
          {@render children()}
        </div>
    </div>
    {/key}
  </main>
  
</div> 
<!-- app -->

<style>
  
  .banner {
    position: relative;
  }
  .textbox {
    display: flex;
    gap: 0 0.5rem;
    margin: 0.25em 0;
  }
  .tunings {    
    margin: 0.25em 0 1rem;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tab {
    &:hover:not(:active), &.selected {
      color: var(--active-color) !important;
    }
  }
</style>