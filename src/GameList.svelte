<script>
    import {onMount} from "svelte";
    import { Link } from "svelte-navigator";
    import { gameData } from './stores/singe-game';
    export let selectedDate;
    const endpoint = "NBA_API_ENDPOINT";

    async function getNbaBars(gameId) {
        const res = await fetch(`${endpoint}/bars/${gameId}`);
        if (res.ok) {
            if (res.ok) {
                return await res.json();
            } else {
                throw new Error("problem");
            }
        }
    }

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

    async function sendGameEvent(gameId) {
        gameData.set(await getNbaBars(gameId));
    }

    onMount(async () => {
        promise = getGames(selectedDate)
    });
</script>
{#await promise then games}
    {#if games}
<div class="btn-group game-list">
    {#each games as {boxscore, awayTeam, homeTeam, profile}}
            <Link to={`game/${profile.gameId}/plusMinus`}>
            <button type="button" class="text-nowrap btn btn-outline-primary"  on:click={e => sendGameEvent(profile.gameId)}>
                    <div>{awayTeam.profile.name}  {#if boxscore.status != "1"} {boxscore.awayScore} {/if}</div>
                    <div>{homeTeam.profile.name} {#if boxscore.status != "1"}{boxscore.homeScore}{/if}</div>
                    <div>{boxscore.periodClock} {boxscore.statusDesc}</div>
            </button>
            </Link>

    {/each}
</div>
        {/if}
{/await}
