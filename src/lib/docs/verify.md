## Verify

- 2 factor click event:
  - 1st click initiates a second button
  - the 2nd button fires the 'verified' event
  - event is passed to the parent element
- takes 2 props and passes a custom event
  - `ask` parameter is the initial text content
    - default - `⋮`
  - `verify` parameter is text content on second prompt
    - default - `×`
  - `verified` is the custom event dispatched

```html
<Delete verified={() => deleteItem(item)} /> 
<Delete ask="delete" verify="are you sure?"           
        verified={() => deleteItem(item)} />
```  

```html
<script>
	let pending = $state(false),
		{ verified = () => console.log("verified: test"), ask="⋮", verify="×" } = $props();
	function clickOutside(node) {
    const handleClick = (event) => {
      if (!node.contains(event.target)) { node.dispatchEvent(new CustomEvent("outclick")); }};
    document.addEventListener("click", handleClick, true);
    return { destroy() { document.removeEventListener("click", handleClick, true); },};
  }
</script>


<div class="button_verify">
	{#if !pending} 
	<button onclick={() => {
		pending = true; }}>{ask}</button>
	{:else} 
	<button use:clickOutside
		onclick={() => {
			pending = !pending;
			verified(); }}
		onoutclick={() => pending = false }>{verify}</button>
	{/if}
</div>


<style>
  .button_verify {
		display: inline-grid;
		place-items: center;
		border-radius: 0.25em;
	}
	button {
		border: 0;
		height: 1.5rem;
		width: 1.5rem;
		font-size: inherit;
		background: unset;
		padding: 0;
		cursor: pointer;
		font-style: bold;
	}
</style>


<!-- USE:
  <Delete verified={() => deleteItem(item)}/>
  <Delete ask="delete" verify="are you sure?"
    verified={() => deleteItem(item)}/>
-->
```

<style>
  
</style>