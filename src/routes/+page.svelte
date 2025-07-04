<script>  
  import { getContext } from "svelte";
  import { titlecase }  from "$lib";
  let ctx = getContext('ctx');
  // const {title,artist,album,songwriter,year,tuning,capo, tab} = ctx?.selectedTab;

  const tab = ctx?.selectedTab;
  
</script>

{#if ctx.selectedTab}
<div class="row">
  <div class="title">
    <h2> {titlecase(tab.title)} </h2>
    <div class="songwriter">( { tab.songwriter } )</div>
  </div>
  <div class="meta">
    <div class="artist">{tab.artist}</div>
    <div class="artist">{tab.album}: &nbsp; {tab.year}</div>
  </div>
</div>

<div class="meta" style:margin="1rem 0">
  <div class="artist">tuning: &nbsp; {tab.tuning}</div>
  {#if tab.tuning_detail}
  <div class="capo">detail: &thinsp; &nbsp; {tab.tuning_detail}</div>
  {/if}
  {#if tab.capo}
  <div class="capo">capo: &emsp; {tab.capo}</div>
  {/if}
</div>





<!-- <br> -->

<div class="tablature">
  {tab.tab}
</div>


{:else}
<h2 class="">
  Tablature
</h2>
{/if}



<style>
  .tablature {
    font-family: var(--monospace);
    font-size: 0.75em;
    white-space: pre-wrap;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0 1rem;

  }
  .songwriter {
    font-size: 0.75rem;
    font-style: italic;
  }
  .meta { font-size: 0.875em; }
</style>