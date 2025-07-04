<script>
  import { slide } from "svelte/transition";

  let { folder="folder", selected, body, ...props } = $props();
</script>

<div class="shell">
  <button class:selected class="unset folder" {...props}>{ folder }</button>

  {#if selected}
   <!-- svelte-ignore slot_element_deprecated -->
   <div class="body" transition:slide>
    <!-- {@render body()} -->
     <slot/>
   </div>
  {/if}
 
</div>

<style>

  /* .selected { color: var(--active-color); } */
  .folder {
    line-height: 1.6;

    &:hover:not(:active), &.selected {
      color: var(--active-color);
    }
  }
  .body {
    display: grid;
    padding: 0.5ch 0 1ch 1rem;
  }
</style>