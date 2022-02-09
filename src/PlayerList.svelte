<script>
    export let players;
    export let playerSelected;
</script>
<ul class="d-none d-lg-block">
{#each players as { player }}
     <li class="list-group-item"><a href="#" on:click={e => playerSelected(player.personId)}>{player.name}</a></li>
{/each}
</ul>
<div class="d-lg-none">
{#if players.length}
     <select on:change={e => { if (e.target.value) playerSelected(parseInt(e.target.value))}}>
          <option value="">Select a player</option>
     {#each players as { player }}
          <option value={player.personId}>{player.name}</option>
     {/each}
     </select>

{/if}
</div>
