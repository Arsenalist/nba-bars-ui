<script>
    export let team;
</script>
<style>
    h5 {
        text-align: center;
    }
</style>
{#if team}
    <h5>{team.teamName}</h5>
{/if}
