<script>
    import TeamLineScore from "./TeamLineScore.svelte";
    export let boxScore;
</script>

{#if boxScore && boxScore.awayTeam}
    <div class="container game-summary">
<div class="row align-items-center">
    <div class="col-md-1 col-sm-3">
        <h3>{boxScore.awayTeam.teamName}</h3>
    </div>
    <div class="col-md-1 d-none d-sm-block">
        <img src={`https://cdn.nba.com/logos/nba/${boxScore.awayTeam.teamId}/global/L/logo.svg`}/>
    </div>
    <div class="col-md-1 col-sm-3">
        <h3>{boxScore.awayTeam.score}</h3>
    </div>
    <div class="col-md-6 d-none d-sm-block">
        <TeamLineScore team={boxScore.awayTeam} showHeader={true}/>
        <TeamLineScore team={boxScore.homeTeam}/>
    </div>
    <div class="col-md-1 col-sm-3">
        <h3>{boxScore.homeTeam.score}</h3>
    </div>
    <div class="col-md-1 d-none d-sm-block">
        <img src={`https://cdn.nba.com/logos/nba/${boxScore.homeTeam.teamId}/global/L/logo.svg`}/>
    </div>
    <div class="col-md-1 col-sm-3">
        <h3>{boxScore.homeTeam.teamName}</h3>
    </div>
</div>
    </div>
{/if}

