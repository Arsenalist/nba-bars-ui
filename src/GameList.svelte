<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let games;
    export let gameSelected;

    function sendGameEvent(gameId) {
        gameSelected(gameId);
    }
</script>
<ul class="list-group list-group-horizontal">
    {#each games as {boxscore, awayTeam, homeTeam, profile}}
            <li class="list-group-item">
                <a href="#" on:click={e => sendGameEvent(profile.gameId)}>
                    <div>{awayTeam.profile.name}  {#if boxscore.status != "1"} {boxscore.awayScore} {/if}</div>
                    <div>{homeTeam.profile.name} {#if boxscore.status != "1"}{boxscore.homeScore}{/if}</div>
                    <div>{boxscore.periodClock} {boxscore.statusDesc}</div>
                </a>
            </li>

    {/each}
</ul>
