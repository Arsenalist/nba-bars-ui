<script>
    export let scoringRunData;
    export let boxScore;
    function displayRun(run) {
        return `${parseInt(run.endAction.scoreAway)-parseInt(run.startAction.scoreAway)}-${parseInt(run.endAction.scoreHome)-parseInt(run.startAction.scoreHome)} in ${run.runDurationDisplay}`;
    }
</script>
{#if scoringRunData}
<table class="table">
    <thead>
    <tr>
        <th>Start</th>
        <th>End</th>
        <th>Run</th>
        <th>Difference</th>
    </tr>
    </thead>
    <tbody>
{#each scoringRunData.homeScoringRuns as run}

    <tr>
        <td><span class="badge  bg-light text-dark">{run.startAction.clock}</span> {run.startAction.scoreAway}-{run.startAction.scoreHome}</td>
        <td>{run.endAction.scoreAway}-{run.endAction.scoreHome} <span class="badge  bg-light text-dark">{run.endAction.clock}</span></td>
        <td>{displayRun(run)}</td>
        <td>{run.difference}</td>
    </tr>
{/each}
    </tbody>
</table>
{/if}
