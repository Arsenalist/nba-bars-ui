<script>
     import {awayPlayers, homePlayers, player} from "./stores/singe-game";
     export let players;

     function playerSelected(personId) {
          const selectedPlayer = $awayPlayers.concat($homePlayers).find(p => p.player.personId === personId);
          player.set(selectedPlayer);
     }
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
