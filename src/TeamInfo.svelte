<script>
    export let team;
</script>
<style>
    h3 {
        text-align: center;
    }
</style>
{#if team}
    <h5>{team.teamName}</h5>
{/if}
