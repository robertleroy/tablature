<script>
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import Treenode from "./Treenode.svelte";
	let { item, expanded = false, pathname, ...props } = $props();


	let sidebarOpen = getContext('sidebarOpen');

	function toggle() {
		// expanded = !expanded;
	}
</script>

<button class="treenode" class:expanded
	class:active={pathname == item.path}
  class:folder={item.children} 
	onclick={ toggle }>
	<a href={item.path} {...props} >{item.name}</a>
</button>
<!-- class:active={pathname.includes(item.path)} -->

{#if item.children && expanded}
	<div class="children" transition:slide={{ duration: 500 }}>
		{#each item.children as child}
		<Treenode item={child} {pathname} 
			onclick={() => {
				sidebarOpen.value = false;
			}}
			expanded={pathname.includes(child.path)}
		/>
		{/each}
	</div>
{/if}

<style>
	button.treenode {
		display: block;
		font-size: inherit;
		line-height: inherit;
		background: unset;
    height: unset;
		padding: unset;
		border: unset;
    box-shadow: unset;
		cursor: pointer;
	}
	.children {
		/* border-left: 1px dashed #ccc; */
		padding-left: 2ch;
	}
	.folder {
		position: relative;
		&::after {
			content: ' \203A';
			position: absolute;
			width: 1ch;
			/* top: -0.0625em; */
			line-height: 1.5;
			right: -1.75ch;
			transform-origin: 40% 60%;
			transition: 200ms;
		}
	}
	.folder.expanded::after { 
		rotate: 90deg; 
	}
</style>

<!-- 
import Treenode from "$lib/components/Treenode.svelte";
<Treenode {item} />
-->
