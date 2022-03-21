<script>
    export let boxScore;
    export let timeoutAnalysis;

</script>
{#if timeoutAnalysis}
    <div class="container">
    <table class="table">
        <thead>
        <tr>
        <th>Timeout</th>
        <th>Game Score ({boxScore.awayTeam.teamTricode}-{boxScore.homeTeam.teamTricode})</th>
        <th>Succeeding Run ({boxScore.awayTeam.teamTricode}-{boxScore.homeTeam.teamTricode})</th>
        </tr>
        </thead>
        <tbody>
        {#each timeoutAnalysis as t}
            <tr>
                <td>
                    {#if t.timeoutAction.teamId}
                        <img alt={t.timeoutAction.teamTricode} style="width: 20px" src={`https://cdn.nba.com/logos/nba/${t.timeoutAction.teamId}/global/L/logo.svg`}/>
                    {/if}
                    {t.timeoutAction.clock}, {t.timeoutAction.description}
                </td>
                <td>
                    {#if t.timeoutAction.scoreAway > t.timeoutAction.scoreHome}
                        <strong>{t.timeoutAction.scoreAway}</strong>
                    {:else}
                        {t.timeoutAction.scoreAway}
                    {/if}
                    -
                    {#if t.timeoutAction.scoreHome > t.timeoutAction.scoreAway}
                        <strong>{t.timeoutAction.scoreHome}</strong>
                    {:else}
                        {t.timeoutAction.scoreHome}
                    {/if}
                </td>
                <td>
                    {#if t.afterRun.awayScore > t.afterRun.homeScore}
                        <strong>{t.afterRun.awayScore}</strong>
                    {:else}
                        {t.afterRun.awayScore}
                    {/if}
                    -
                    {#if t.afterRun.homeScore > t.afterRun.awayScore}
                        <strong>{t.afterRun.homeScore}</strong>
                    {:else}
                        {t.afterRun.homeScore}
                    {/if}
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    </div>
{/if}
