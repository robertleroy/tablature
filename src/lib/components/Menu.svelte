<script>
  let { open, ...attr } = $props();
</script>

<button class="unset" {...attr} class:open title="menu" aria-label="menu">
  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <g class="a">
      <circle cx="12" cy="6" r="2"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="12" cy="18" r="2"/>
    </g>
  </svg>
</button>

<style>
  button {
    font-size: inherit;
  }
  svg {
    fill: currentColor;
    font-size: 1em;
    width: 1.5em;
    height: 1.5em;
    transition: 150ms;
    g { 
      transform-origin: center;
      transition: 200ms; 
    }
  }
  .open {
    g.a { rotate: 90deg; }
  }
</style>