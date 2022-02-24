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
        assistDistributionGraphData, periodBarChartsGraphData, awayTeamShotDistanceData, homeTeamShotDistanceData,
        playerShotDistanceData, teamPointsInThePaintGraphData, teamFastBreakPointsGraphData,
        teamPointsOffTurnoversGraphData;
    let selectedTab = "game-charts";

    async function gameSelected(gameId) {
        clearGraphs();
        currentGameId = gameId;
        promise = await getNbaBars(gameId);
        selectedTab = "game-charts";
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
        awayTeamShotDistanceData = {
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            made: promise.awayTeam.shotDistance.filter(sd => sd.action.shotResult === "Made"),
            missed: promise.awayTeam.shotDistance.filter(sd => sd.action.shotResult === "Missed"),
            title: `${promise.boxScore.awayTeam.teamName} Shot Distance`
        }

        homeTeamShotDistanceData = {
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            made: promise.homeTeam.shotDistance.filter(sd => sd.action.shotResult === "Made"),
            missed: promise.homeTeam.shotDistance.filter(sd => sd.action.shotResult === "Missed"),
            title: `${promise.boxScore.homeTeam.teamName} Shot Distance`
        }

        teamPointsInThePaintGraphData = {
            boxScore: promise.boxScore,
            awayData: promise.awayTeam.pointsInThePaint,
            homeData: promise.homeTeam.pointsInThePaint,
            title: 'Points in the Paint',
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            teamStatistic: 'pointsInThePaint'
        }

        teamFastBreakPointsGraphData = {
            boxScore: promise.boxScore,
            awayData: promise.awayTeam.pointsFastBreak,
            homeData: promise.homeTeam.pointsFastBreak,
            title: 'Fastbreak Points',
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            teamStatistic: 'pointsFastBreak'
        }

        teamPointsOffTurnoversGraphData = {
            boxScore: promise.boxScore,
            awayData: promise.awayTeam.pointsFromTurnovers,
            homeData: promise.homeTeam.pointsFromTurnovers,
            title: 'Points Off Turnovers',
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            teamStatistic: 'pointsFromTurnovers'
        }
    }

    async function playerSelected(personId) {
        const player = awayPlayers.concat(homePlayers).find(p => p.player.personId === personId);
        currentPlayer = player;
        periodBarChartsGraphData = {
            chartLabels: promise.chartLabels,
            lineupIntervalsText: promise.lineupIntervalsText,
            player: player
        }
        assistDistributionGraphData = {
            player: player.player,
            allAssistDistributions: promise.awayTeam.assistDistribution.concat(promise.homeTeam.assistDistribution)
        }

        const allShots = promise.awayTeam.shotDistance.concat(promise.homeTeam.shotDistance);
        playerShotDistanceData = {
            lineupIntervals: promise.lineupIntervals,
            lineupIntervalsText: promise.lineupIntervalsText,
            made: allShots.filter(sd => sd.action.shotResult === "Made" && sd.action.personId === player.player.personId),
            missed: allShots.filter(sd => sd.action.shotResult === "Missed" && sd.action.personId === player.player.personId),
            title: `Shot Distance`
        }
    }

    let selectedDate;

    async function setDate(d) {
        clearGraphs();
        selectedDate = d;
    }

    function clearGraphs() {
        selectedTab = "";
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
    import TeamShotDistanceGraph from "./ShotDistanceGraph.svelte";
    import TeamComparisonByPeriodGraph from "./TeamComparisonByPeriodGraph.svelte";
    import GameSummary from "./GameSummary.svelte";

    function tabSelected(tab: string) {
        selectedTab = tab;
    }

</script>

<html>
<head>
    <title>Bars</title>
</head>
<body>
<div class="starter-template">
<main role="main" class="container-fluid">
    <Nav/>
    <DateList dateSetHandler={setDate} />
    <div class="row">
        <div class="col text-center d-flex justify-content-center">
            <GameList selectedDate={selectedDate} gameSelected={gameSelected}/>
        </div>
    </div>
    {#if selectedTab !== ""}
        <GameTabs tabSelectedHandler={tabSelected} selectedTab={selectedTab} gameId={currentGameId}/>
    {/if}
    {#if boxScore !== ""}
        <GameSummary boxScore={boxScore}/>
    {/if}
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
    <div class="row">
        <div class="col">
            <TeamShotDistanceGraph data={awayTeamShotDistanceData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamShotDistanceGraph data={homeTeamShotDistanceData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamComparisonByPeriodGraph data={teamPointsInThePaintGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamComparisonByPeriodGraph data={teamFastBreakPointsGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamComparisonByPeriodGraph data={teamPointsOffTurnoversGraphData}/>
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
    <div class="row">
        <div class="col">
            <TeamShotDistanceGraph data={playerShotDistanceData}/>
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
