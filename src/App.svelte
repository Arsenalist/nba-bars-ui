<script lang="ts">
    import Nav from "./Nav.svelte";

    const endpoint = "NBA_API_ENDPOINT";

    let promise;
    let awayPlayers = []
    let homePlayers = []
    let boxScore = {};
    let currentPlayer = {};
    let currentGameId = undefined;
    let differentialData, lineupGraphData, awayPlayersLineupGraphData, homePlayersLineupGraphData,
        assistDistributionGraphData, periodBarChartsGraphData;
    let selectedTab = "game-charts";

    async function gameSelected(gameId) {
        currentGameId = gameId;
        promise = await getNbaBars(gameId);
        awayPlayers = promise.awayTeam.players;
        homePlayers = promise.homeTeam.players;
        boxScore = promise.boxScore;
        lineupGraphData = {
            lineups: promise.lineups,
            boxScore: promise.boxScore,
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText
        }
        awayPlayersLineupGraphData = {
            playerLineups: promise.awayPlayerLineups,
            team: promise.boxScore.awayTeam,
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText
        }

        homePlayersLineupGraphData = {
            playerLineups: promise.homePlayerLineups,
            team: promise.boxScore.homeTeam,
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText
        }
        differentialData = {
            differential: promise.differential,
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            boxScore: promise.boxScore,
        }
    }

    async function playerSelected(personId) {
        const player = awayPlayers.concat(homePlayers).find(p => p.player.personId === personId);
        currentPlayer = player;
        periodBarChartsGraphData = {
            groupLabels: promise.groupLabels,
            chartLabels: promise.chartLabels,
            player: player
        }
        assistDistributionGraphData = {
            player: player.player,
            allAssistDistributions: promise.awayTeam.assistDistribution.concat(promise.homeTeam.assistDistribution)
        }
    }

    let selectedDate;

    async function setDate(d) {
        selectedDate = d;
    }

    async function getNbaBars(gameId) {
        const res = await fetch(`${endpoint}/bars/${gameId}`);
        if (res.ok) {
            if (res.ok) {
                return await res.json();
            } else {
                throw new Error("problem");
            }
        }
    }

    import GameList from "./GameList.svelte";
    import TeamInfo from "./TeamInfo.svelte";
    import PlayerGameDetail from "./PlayerGameDetail.svelte";
    import PlayerList from "./PlayerList.svelte";
    import GameTabs from "./GameTabs.svelte";
    import BoxScore from "./BoxScore.svelte";
    import DateList from "./DateList.svelte";
    import DifferentialGraph from "./DifferentialGraph.svelte";
    import TeamLineups from "./TeamLineups.svelte";
    import PlayerLineupGraph from "./PlayerLineupGraph.svelte";
    import AssistDistributionGraph from "./AssistDistributionGraph.svelte";
    import PlayerPeriodBarCharts from "./PlayerPeriodBarCharts.svelte";

    function tabSelected(tab: string) {
        selectedTab = tab;
    }

</script>

<html>
<head>
    <title>Barchart Demo</title>
</head>
<body>
<div class="starter-template">
<main role="main" class="container">
    <Nav/>
    <DateList dateSetHandler={setDate} />
    <div class="row">
        <div class="col text-center d-flex justify-content-center">
            <GameList selectedDate={selectedDate} gameSelected={gameSelected}/>
        </div>
    </div>
     <GameTabs tabSelected={tabSelected} gameId={currentGameId}/>
    {#if selectedTab === "game-charts"}
    <div class="row">
        <div class="col">
            <DifferentialGraph data={differentialData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamLineups data={lineupGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerLineupGraph data={awayPlayersLineupGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerLineupGraph data={homePlayersLineupGraphData}/>
        </div>
    </div>
    {/if}
    {#if selectedTab === "player-charts"}
    <div class="row">
        <div class="col">
            <TeamInfo team={boxScore.awayTeam}/>
            <PlayerList players={awayPlayers} playerSelected={playerSelected}/>
        </div>
        <div class="col">
            <TeamInfo team={boxScore.homeTeam}/>
            <PlayerList players={homePlayers} playerSelected={playerSelected}/>
        </div>
     </div>
    <div class="row">
        <div class="col">
            <PlayerGameDetail player={currentPlayer.player}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerPeriodBarCharts data={periodBarChartsGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <AssistDistributionGraph data={assistDistributionGraphData}/>
        </div>
    </div>
    {/if}
    {#if selectedTab === "box-score"}
        <div class="row">
            <div class="col">
                <BoxScore boxScore={boxScore}/>
            </div>
        </div>
    {/if}
</main>
</div>


</body>
</html>
