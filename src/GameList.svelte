<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let games;
    export let gameSelected;

    function sendGameEvent(gameId) {
        gameSelected(gameId);
    }
</script>
<div class="btn-group">
    {#each games as {boxscore, awayTeam, homeTeam, profile}}
            <button type="button" class="btn btn-outline-primary"  on:click={e => sendGameEvent(profile.gameId)}>
                    <div>{awayTeam.profile.name}  {#if boxscore.status != "1"} {boxscore.awayScore} {/if}</div>
                    <div>{homeTeam.profile.name} {#if boxscore.status != "1"}{boxscore.homeScore}{/if}</div>
                    <div>{boxscore.periodClock} {boxscore.statusDesc}</div>
            </button>

    {/each}
</div>
