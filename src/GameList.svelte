<script>
    import {onMount} from "svelte";

    export let selectedDate;
    export let gameSelected;

    async function getGames(date) {
        if (date) {
            const endpoint = "NBA_API_ENDPOINT";
            const res = await fetch(`${endpoint}/games/${date}`)
            if (res.ok) {
                return await res.json();
            } else {
                throw new Error("problem");
            }
        }
    }

    let promise;
    $:  {
        promise = getGames(selectedDate)
    }

    function sendGameEvent(gameId) {
        gameSelected(gameId);
    }

    onMount(async () => {
        promise = getGames(selectedDate)
    });
</script>
{#await promise then games}
    {#if games}
<div class="btn-group">
    {#each games as {boxscore, awayTeam, homeTeam, profile}}
            <button type="button" class="btn btn-outline-primary"  on:click={e => sendGameEvent(profile.gameId)}>
                    <div>{awayTeam.profile.name}  {#if boxscore.status != "1"} {boxscore.awayScore} {/if}</div>
                    <div>{homeTeam.profile.name} {#if boxscore.status != "1"}{boxscore.homeScore}{/if}</div>
                    <div>{boxscore.periodClock} {boxscore.statusDesc}</div>
            </button>

    {/each}
</div>
        {/if}
{/await}
