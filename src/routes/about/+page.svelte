<script>
  let title = $state("About"),
      todos = $state([
        { name: "Sort by tuning..", checked: true },
        { name: "Clean up code", checked: false },
        // { item: "", checked: false },
      ]);
</script>

<h2 class="">
  {title}
</h2>
<br>
<h4>Todo</h4>
<div class="list">
  {#each todos as item}
  <div class="item">
    <input type="checkbox" bind:checked={item.checked}>
    <div>{item.name}</div>
  </div>
  {/each}
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 0 1ch;
  }
</style>