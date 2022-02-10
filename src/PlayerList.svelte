<script>
    export let players;
    export let playerSelected;
</script>
<div>
{#if players.length}
     <select on:change={e => { if (e.target.value) playerSelected(parseInt(e.target.value))}}>
          <option value="">Select a player</option>
     {#each players as { player }}
          <option value={player.personId}>{player.name}</option>
     {/each}
     </select>
{/if}
</div>
