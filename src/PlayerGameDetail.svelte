<script>
    import BoxScoreHeaderRow from "./BoxScoreHeaderRow.svelte";
    import BoxScorePlayerRow from "./BoxScorePlayerRow.svelte";

    export let player;
</script>
<style>
    h4 {
        text-align: center;
    }
    div.headshot img {
        max-width: 200px;
    }
    div.headshot {
        text-align: center;
    }
</style>
{#if player && player.player}
    <h4>{player.player.name}</h4>
    <div class="headshot">
    <img alt={`${player.player.name} Headshot`} class="headshot" src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player.personId}.png`}/>
    </div>
    <table class="table ">
        <BoxScoreHeaderRow/>
        <tbody>
            <BoxScorePlayerRow player={player.player}/>
        </tbody>
    </table>
{/if}


