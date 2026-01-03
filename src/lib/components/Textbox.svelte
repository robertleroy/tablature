<script>
  let { searchterm = $bindable(), data, ...rest } = $props();
</script>

<div class="my-textbox">
  <input type="text" {...rest}
    bind:value={searchterm}>

  <button class="unset"
    class:searching={searchterm.length}
    onclick={() => {
      searchterm = "";
    }}> 🞫
    <!-- {searchterm.length ? "🞫" : ""} -->
    </button>
</div>

<style>
  .my-textbox {
    display: inline flex;
    font-family: inherit;
    height: var(--button-height, 1.5);
    max-width: 100%;
    color: var(--fg-button, inherit);
    background-color: var(--bg-button, inherit);
    border: 1px solid var(--border-color, #ccc);
    border-radius: var(--border-radius, 0.25em);
    overflow: hidden;
    vertical-align: var(--vertical-align);
    input {
      flex: 1;
      height: 100%;
      border-radius: 0;
      outline: none;
    }

    input, button {
      background: none;
      border: none;

    }
    button {
      width: 1.5rem;
      text-align: center;
      opacity: 0.2;
    }

    &:focus-within {
      border-color: var(--outline-color);
      outline: 1px solid var(--outline-color);
    }

    button.searching {
      opacity: 0.8;
    }
  }
</style>