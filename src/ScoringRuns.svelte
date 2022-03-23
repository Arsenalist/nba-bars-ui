<script>
    import TeamScoringRun from "./TeamScoringRun.svelte";
    export let scoringRunData;
    export let boxScore;
</script>
{#if scoringRunData}
    <p>
        Shows top five scoring runs for each team. The maximum duration of a run is 15 minutes.
    </p>
    <h3>{boxScore.awayTeam.teamName}</h3>
    <TeamScoringRun scoringRuns={scoringRunData.awayScoringRuns}/>
    <h3>{boxScore.homeTeam.teamName}</h3>
    <TeamScoringRun scoringRuns={scoringRunData.homeScoringRuns}/>
{/if}
