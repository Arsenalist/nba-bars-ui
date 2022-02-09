<script>
    export let player;
</script>
<style>
    table td, table th, h4 {
        text-align: center;
    }
    div.headshot img {
        max-width: 200px;
    }
    div.headshot {
        text-align: center;
    }
</style>
{#if player.player}
    <h4>{player.player.name}</h4>
    <div class="headshot">
    <img class="headshot" src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.player.personId}.png`}/>
    </div>
    <table class="table ">
        <thead>
            <tr>
                <th>PTS</th>
                <th>FG</th>
                <th>3FG</th>
                <th>FT</th>
                <th>REB</th>
                <th>OREB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>PF</th>
                <th>+/-</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>{player.player.statistics.points}</td>
            <td>{player.player.statistics.fieldGoalsMade}/{player.player.statistics.threePointersAttempted}</td>
            <td>{player.player.statistics.threePointersMade}/{player.player.statistics.fieldGoalsAttempted}</td>
            <td>{player.player.statistics.freeThrowsAttempted}/{player.player.statistics.freeThrowsMade}</td>
            <td>{player.player.statistics.reboundsTotal}</td>
            <td>{player.player.statistics.reboundsOffensive}</td>
            <td>{player.player.statistics.assists}</td>
            <td>{player.player.statistics.steals}</td>
            <td>{player.player.statistics.blocks}</td>
            <td>{player.player.statistics.foulsPersonal}</td>
            <td>{player.player.statistics.plusMinusPoints}</td>
        </tr>
        </tbody>
    </table>
{/if}


