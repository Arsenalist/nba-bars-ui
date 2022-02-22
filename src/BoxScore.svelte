<script>
    import BoxScoreHeaderRow from "./BoxScoreHeaderRow.svelte";
    import BoxScorePlayerRow from "./BoxScorePlayerRow.svelte";

    export let boxScore;
</script>
<div>
    <h4>{boxScore.awayTeam.teamName}</h4>
    <table class="table">
        <BoxScoreHeaderRow/>
        <tbody>
            {#each boxScore.awayTeam.players as p}
                <BoxScorePlayerRow player={p}/>
            {/each}
        </tbody>
    </table>
    <h4>{boxScore.homeTeam.teamName}</h4>
    <table class="table">
        <BoxScoreHeaderRow/>
        <tbody>
        {#each boxScore.homeTeam.players as p}
            <BoxScorePlayerRow player={p}/>
        {/each}
        </tbody>
    </table>
</div>
