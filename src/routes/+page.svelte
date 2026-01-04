<script>  
import { store } from "$lib";
  const title = "Tablature";
</script>


<div class="meta">
  <div class="column">
    <h2 class="title">
      {store.selectedTab?.title ?? "Tablature.."}
    </h2>
    <div class="metric songwriter">{store.selectedTab?.songwriter.join(", ") ?? ""}</div>
  </div>

  <div class="column metric">
    <div class="artist metric">
      {store.selectedTab?.artist ?? ""}
    </div>
    <div class="album metric">
      {store.selectedTab?.album ?? ""} &nbsp; {store.selectedTab?.year ?? ""}
    </div>

    <dl class="mods">
      {#if store.selectedTab?.tuning && store.selectedTab?.tuning !== "Standard"}
      <dt>Tuning</dt>
      <dd class="tuning">{store.selectedTab?.tuning_detail}</dd>
      {/if}
      {#if store.selectedTab?.capo}
      <dt>Capo</dt>
      <dd class="capo">{store.selectedTab?.capo}</dd>
      {/if}
    </dl>   
  </div>
</div>

{#if store?.selectedTab}
  <hr>
  <div class="tab-content">
    {@html store.selectedTab?.content}
  </div>
{:else}
  <div class="icon_display">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M15.227 7.334c-.95-.744-2.004-1.231-3.058-1.418-1.347-.237-2.758.038-3.732 1.01-.584.585-.897 1.267-1.088 1.86a1 1 0 0 0-.038.167c-.133.942-.303 1.185-.512 1.34s-.748.304-1.72.443l-.023.003c-1.054.174-2.385.516-3.455 1.586-2.453 2.453-1.988 6.646.72 9.354s6.9 3.173 9.354.72c1.07-1.07 1.412-2.4 1.586-3.455l.003-.023c.14-.972.289-1.51.444-1.72s.397-.38 1.339-.513a1 1 0 0 0 .167-.037c.592-.19 1.274-.504 1.858-1.088.652-.652 1-1.517 1.076-2.405a1.02 1.02 0 0 0-1.036-1.106 1.53 1.53 0 0 1-1.118-.447 1.5 1.5 0 0 1-.3-.42l-1.472 1.473a3.46 3.46 0 0 0 1.535 1.173c-.056.083-.052.22-.124.292-.272.272-.598.439-.984.568-1.13.176-2.031.56-2.579 1.303-.562.762-.673 1.616-.818 2.617-.15.903-.39 1.723-1.017 2.349-1.52 1.52-4.414 1.341-6.475-.72s-2.24-4.956-.72-6.476c.62-.62 1.432-.864 2.327-1.014l.022-.003c1.001-.143 1.855-.256 2.617-.817.742-.548 1.127-1.45 1.303-2.58.129-.385.295-.711.568-.983.417-.419 1.07-.6 1.938-.446.582.103 1.217.532 1.837.988zM5.861 15.26l2.878 2.878-.72.72-2.877-2.879zM19.534 1.588l.36.36-.36.36-.36-.36zm.72-.72.359.36-.36.36-.36-.36zm.719-.719.36.36-.36.36-.36-.36zm1.08 3.958.359.359-.36.36-.36-.36zm.72-.72.358.36-.359.36-.36-.36zm.719-.72.359.36-.36.36-.36-.36zM22.412.149a.51.51 0 0 0-.72 0l-2.518 2.518a.51.51 0 0 0 0 .72l1.439 1.438a.51.51 0 0 0 .72 0l2.518-2.518a.51.51 0 0 0 0-.72zm-.36 1.079.72.72-1.799 1.799-.72-.72zm-2.877 2.158 1.439 1.44-9.715 9.714-1.44-1.439zm-7.557 11.875a2.035 2.035 0 0 1-2.878 0 2.035 2.035 0 0 1 0-2.878 2.035 2.035 0 0 1 2.878 0 2.035 2.035 0 0 1 0 2.878" />
    </svg>
  </div>

{/if}


<style>
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 0 2rem;
    font-size: 0.875em;
  }

  .artist {
    font-weight: 600;
    font-size: 15px;
  }
  .album { font-size: 14px; }
  .songwriter { font-size: smaller; }
  .tuning { font-family: var(--monospace); }
  dl {
    line-height: 1.4;
    margin: 0.5rem 0 0;
    dt {
      font-family: inherit;
      font-size: 13px;
      font-weight: normal;
    }
    dt, dd { line-height: 1.5; }
  }
  hr { margin: 1rem 0 2rem; }

  :global {
  .tab-content {
      
    /* --monospace: "Courier New", monospace; */
    pre { 
      line-height: 1.2; 
      font-size: 15px ;
    }
    pre code { 
      /* font-size: 13px ; */
      font-optical-sizing: auto;
    }
  }
}

.icon_display {
  display: grid;
  place-items: center;
  height: 80%;
  
  /* font-size: 4rem; */

  @media (min-width: 768px) { place-items: center; }

  svg {
    height: 1.5em;
    width: 1.5em;
    opacity: 0.045;
    font-size: clamp(8rem, 35vw, 40vh);
  }
}
</style>