<script>
    import TeamScoringRun from "./TeamScoringRun.svelte";
    export let scoringRunData;
    export let boxScore;
</script>
{#if scoringRunData}
    <p>
        Shows top scoring runs for each team. The maximum duration of a run is 15 minutes and only runs which exceed a differential of 8 or more are shown.
    </p>
    <h3>{boxScore.awayTeam.teamName}</h3>
    <TeamScoringRun boxScore={boxScore} scoringRuns={scoringRunData.awayScoringRuns}/>
    <h3>{boxScore.homeTeam.teamName}</h3>
    <TeamScoringRun boxScore={boxScore} scoringRuns={scoringRunData.homeScoringRuns}/>
{/if}
