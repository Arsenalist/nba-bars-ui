<script>
    export let team;
</script>
<style>
    h3 {
        text-align: center;
    }
</style>
{#if team}
    <h3>{team.teamName}</h3>
{/if}
