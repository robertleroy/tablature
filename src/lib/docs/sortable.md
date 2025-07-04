

## Sortablejs & Svelte


<div class="row" style="display: flex; justify-content: space-between;">
  <em>example using svelte5</em>
  <a href="https://github.com/SortableJS/Sortable" target="_blank" rel="noreferer">
    sortablejs documentation
  </a>
</div>


<br>

  


- install  

```sh
npm install sortablejs --save
```  

<br>

- init onMount
  - takes 2 parameters
    - Reference to the 'list' element (bind:this...)
    - An 'options' object. see docs
  - Can be assigned to a variable
    - makes properties and events accessible
    - usefull for triggering sort 
- List / Order
  - Pass an array to #each block
    - sortable will use a data-id attribute for sorting
      - set this as of ids to keep track of order.
    - calling this order on sort, and saving it after is how to persist the sort.
    - The items array remains unchanged by sort.



```html
<!-- Draglist.svelte -->
<script>
	import Sortable from 'sortablejs';
  import { onMount, tick } from "svelte";
	import { slide } from "svelte/transition";
	import Delete from "./Verify.svelte";
	import { store } from "./store.svelte";

	let complete = $state(false);
	let el, sortable;

	// $effect(() => {
	// 	console.log($state.snapshot(store));
	// })

	const options = {
		group: '',
	  animation: 200,
		ghostClass: "ghost",       /* placeholder element under the drag */
		dragClass: "transparent",  /* element that follows the mouse */
    filter: "input, button, .deleteBtn",
		store: {
			get: function(sortable) { 
				/* Called once on init, gets and 
				applies a stored sortorder array */
				return store.order; 
			}, 
			set: function(sortable) {
				/* Called onEnd (item dropped..)
				iterate the new order
				save to db from here if persisting */
				store.order = sortable.toArray();				
			}
		},
	};
	
	async function addItem(e) {
		const id = Date.now().toString(36);
		const name = e.target.value;
		if (name.length < 3) return;
		store.items.push({ id, name });
		store.order.push(id);
		e.target.value = "";

		/* forcing sort here lets sortable know 
		to place the new item at the end of the list */
		await tick();
		sortable.sort(store.order);
	}
	function deleteItem(item) {
		/* update items && order */
		store.items = store.items.filter(el => el !== item);
		store.order = store.order.filter(el => el !== item.id);
	}
	onMount(() => {  
		/* sortable: reference accessing sortable properties and functions
			 el: reference to the element sortable is called on
			 options: object customizing soratble properties */
    sortable = Sortable.create(el, options);
  });
</script>

<svelte:head>
	<title>Sortablejs: Draglist</title>
</svelte:head>

<!-- app -->

<div class="app">
	<div class="textbox">
		<input type="text" onchange={addItem} placeholder="..add item">
	</div>
	
	<div class="list" bind:this={el}>
		{#each store.items as item, i (item.id)}
		<div class="listitem" data-id={item.id} transition:slide >   
			<input type="checkbox" bind:checked={item.done} > 
			<div class="content">{item.name}</div>
			<Delete verified={() => deleteItem(item)}/>
		</div>
		{/each}
	</div>
	
	<pre>order: {JSON.stringify(store.order)}</pre>
	<pre>items: [
	{#each store.items as item}  {JSON.stringify(item)},
	{/each}]</pre>
</div>

<!-- end app -->

<style>
	:root {
		--rad: 0.375em;
		--border: 1px solid hsl(0 0 80);
	}
	.textbox input {
		border-radius: var(--rad);
		height: 1.5rem;
		padding: 0 1ch;
		border: var(--border);

		&:focus { border-color: hsl(0 0 0 / 0); }
	}
	.list {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		min-height: 2.64rem;
		margin: 2rem 0;
		background-color: hsl(0 0 85);
		border-radius: var(--rad);
	}
  .listitem {
		display: flex;
		align-items: center;
		gap: 0 1ch;
		padding: 0.5em;
		background: hsl(0 0 95);
		border: var(--border);
    transition: background 500ms;
		
		.content { flex: 1; }

		&:not(:last-child) { border-bottom-style: none; }
		&:first-child { border-radius: var(--rad) var(--rad) 0 0; }
		&:last-child { border-radius: 0 0 var(--rad) var(--rad); }
		&:only-child { border-radius: var(--rad); }
	}
	pre { font-size: 1rem; font-family: "Consolas"; }
	:global(.ghost) { background-color: hsl(0 0 85) !important; }
	:global(.transparent) { opacity: 0 !important; border-radius: var(--rad) !important;}
</style>
```

<br>



<br>