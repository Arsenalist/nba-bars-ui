<script>
    export let player;
</script>
<style>
    td {
        text-align: center;
    }
</style>
{#if player}
<tr>
    <td>{player.name}</td>
    <td>{player.statistics.points}</td>
    <td>{player.statistics.fieldGoalsMade}/{player.statistics.fieldGoalsAttempted}</td>
    <td>{player.statistics.threePointersMade}/{player.statistics.threePointersAttempted}</td>
    <td>{player.statistics.freeThrowsMade}/{player.statistics.freeThrowsAttempted}</td>
    <td>{player.statistics.reboundsTotal}</td>
    <td>{player.statistics.reboundsOffensive}</td>
    <td>{player.statistics.assists}</td>
    <td>{player.statistics.steals}</td>
    <td>{player.statistics.blocks}</td>
    <td>{player.statistics.foulsPersonal}</td>
    <td>{player.statistics.plusMinusPoints}</td>
</tr>
{/if}
