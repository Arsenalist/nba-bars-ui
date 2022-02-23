<script>
    export let team;
    export let showHeader = false;
</script>
<div class="row">
    {#if showHeader}
    <div class="col"></div>
    {#each team.periods as p}
        <div class="col">{p.period}</div>
    {/each}
    <div class="col"></div>
    {/if}
</div>
<div class="row">
    <div class="col">
        {team.teamName}
    </div>
    {#each team.periods as p}
        <div class="col">{p.score}</div>
    {/each}
    <div class="col">
        {team.score}
    </div>
</div>
