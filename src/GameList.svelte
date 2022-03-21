<script>
    import {onMount} from "svelte";
    import { Link } from "svelte-navigator";
    import { gameData } from './stores/singe-game';
    import {getGames, getNbaBars} from "./nba-bars.service";
    import {selectedDate} from "./stores/ui-elements";

    function getGamesIfSelectedDateIsAvailable(date) {
        if (date !== undefined) {
            return getGames(date);
        } else {
            return [];
        }
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
