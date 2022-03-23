<script>
    export let scoringRuns = []
    function displayRun(run) {
        return `${parseInt(run.endAction.scoreAway)-parseInt(run.startAction.scoreAway)}-${parseInt(run.endAction.scoreHome)-parseInt(run.startAction.scoreHome)} in ${run.runDurationDisplay}`;
    }
</script>
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
    {#each scoringRuns as run}
        <tr>
            <td><span class="badge  bg-light text-dark">{run.startClockDisplay}</span> {run.startAction.scoreAway}-{run.startAction.scoreHome}</td>
            <td>{run.endAction.scoreAway}-{run.endAction.scoreHome} <span class="badge  bg-light text-dark">{run.endClockDisplay}</span></td>
            <td>{displayRun(run)}</td>
            <td>{run.difference}</td>
        </tr>
    {/each}
    </tbody>
</table>
