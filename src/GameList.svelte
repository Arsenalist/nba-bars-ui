<script>
    import {onMount} from "svelte";
    import { Link } from "svelte-navigator";
    import { gameData } from './stores/singe-game';
    import {getGames, getNbaBars} from "./nba-bars.service";
    import {selectedDate} from "./stores/ui-elements";
    import dayjs from "dayjs";

    function getGamesIfSelectedDateIsAvailable(date) {
        return date !== undefined ? getGames(date) : [];
    }

    let promise;
    $:  {
        promise = getGamesIfSelectedDateIsAvailable($selectedDate);
    }

    async function sendGameEvent(gameId) {
        gameData.set(await getNbaBars(gameId));
    }

    onMount(async () => {
        promise = getGamesIfSelectedDateIsAvailable($selectedDate);
    });
</script>
{#await promise then games}
    {#if games}
<div class="btn-group game-list">
    {#each games as {boxscore, awayTeam, homeTeam, profile}}
            <Link to={`game/${profile.gameId}/plus-minus`}>
            <button type="button" class="text-nowrap btn btn-outline-primary"  on:click={e => sendGameEvent(profile.gameId)}>
                    <div>{awayTeam.profile.name}  {#if boxscore.status != "1"} {boxscore.awayScore} {/if}</div>
                    <div>{homeTeam.profile.name} {#if boxscore.status != "1"}{boxscore.homeScore}{/if}</div>
                {#if boxscore.statusDesc}
                    <div>{boxscore.periodClock} {boxscore.statusDesc}</div>
                {:else}
                    <div>{dayjs(profile.dateTimeEt).format("h:mm A")} EST</div>
                {/if}
            </button>
            </Link>
    {/each}
</div>
        {/if}
{/await}
