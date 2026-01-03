
// #region FUNCTIONS - December 2025 */

/* round */
export function round(num,d = 0) {
  return Math.round(num * 10**d) / 10**d;
} 

/* titlecase */
export function titlecase(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

/* sentencecase */
export function sentencecase(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, char => char.toUpperCase());
}

/* capitalizeFirstLetter */
export function capitalizeFirstLetter(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
// #endregion FUNCTIONS  */


// #region ATTACHMENTS =================== */
/* Foucs on load */
export function focus(node) {
  node.focus();
  return {
    update() {},
    destroy() {}
  };
}
/* 
import { focus } from "$lib";
<input type="text" {@attach focus}>
*/
// #endregion ATTACHMENTS  */


// #region USE:ACTIONS =================== */
export function clickOutside(node, enabled = true) {
  const handleClick = (event) => {
    if (enabled && node && !node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent("outclick", { detail: event }));
    }
  };

  // Small delay to avoid triggering on the same click that mounted the element
  const timeout = setTimeout(() => {
    document.addEventListener("click", handleClick, true);
  }, 0);

  return {
    update(newEnabled) {
      enabled = newEnabled;
    },
    destroy() {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClick, true);
    }
  };
}
/*

<button onclick={() => isOpen = true}>Open</button>

{#if isOpen}
  <div use:clickOutside={isOpen} onoutclick={() => isOpen = false}>
    Modal content
  </div>
{/if}
end clickOutside*/
// #endregion USE:ACTIONS  */