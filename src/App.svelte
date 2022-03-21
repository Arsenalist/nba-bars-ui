<script lang="ts">
    import Nav from "./Nav.svelte";
    import {
        awayPlayers,
        homePlayers,
        lineupGraphData,
        awayPlayersLineupGraphData,
        homePlayersLineupGraphData,
        differentialData,
        awayTeamShotDistanceData,
        homeTeamShotDistanceData,
        teamPointsInThePaintGraphData,
        teamFastBreakPointsGraphData,
        teamPointsOffTurnoversGraphData,
        timeoutAnalysis,
        boxScore,
        periodBarChartsGraphData,
        assistDistributionGraphData,
        playerShotDistanceData,
        player
    } from './stores/singe-game';
    import {Router, Route} from "svelte-navigator";
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
    import TimeoutAnalysis from "./TimeoutAnalysis.svelte";
    import LineupUsageGraph from "./LineupUsageGraph.svelte";
    import GameLoader from "./GameLoader.svelte";

</script>
<div class="starter-template">
<main role="main" class="container-fluid">
    <Nav/>
    <Router>
    <DateList/>
    <div class="row">
        <div class="col text-center d-flex justify-content-center">
            <GameList/>
        </div>
    </div>
        <Route path="game/:gameId/*">
            <GameLoader/>


        <GameTabs/>
        <GameSummary boxScore={$boxScore}/>

        <Route path="plusMinus">

    <div class="row">
        <div class="col">
            <DifferentialGraph data={$differentialData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamLineups title="Plus/Minus by Lineup" data={$lineupGraphData} textListName="labels" hoverListName="summary"/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerLineupGraph data={$awayPlayersLineupGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerLineupGraph data={$homePlayersLineupGraphData}/>
        </div>
    </div>
        </Route>
        <Route path="ratings">
        <div class="row">
            <div class="col">
                <TeamLineups title="Offensive Rating by Lineup" data={$lineupGraphData} textListName="ortg" hoverListName="ortgExplained" alphaColorListName="ortgAlphaColor" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <TeamLineups title="Defensive Rating by Lineup" data={$lineupGraphData} textListName="drtg" hoverListName="drtgExplained"  alphaColorListName="drtgAlphaColor"/>
            </div>
        </div>
        </Route>

        <Route path="rebounding">
    <div class="row">
        <div class="col">
            <TeamLineups title="OREB% by Lineup" data={$lineupGraphData} textListName="offensiveReboundPercentage" hoverListName="offensiveReboundPercentageExplained"  alphaColorListName="offensiveReboundAlphaColor"/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamLineups   title="DREB% by Lineup" data={$lineupGraphData} textListName="defensiveReboundPercentage" hoverListName="defensiveReboundPercentageExplained"  alphaColorListName="defensiveReboundAlphaColor"/>
        </div>
    </div>
        </Route>
        <Route path="usage">
        <div class="row">
            <div class="col">
                <LineupUsageGraph data={$awayPlayersLineupGraphData}/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <LineupUsageGraph data={$homePlayersLineupGraphData}/>
            </div>
        </div>
        </Route>
        <Route path="scoring">

        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <TeamComparisonByPeriodGraph data={$teamPointsInThePaintGraphData}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <TeamComparisonByPeriodGraph data={$teamFastBreakPointsGraphData}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <TeamComparisonByPeriodGraph data={$teamPointsOffTurnoversGraphData}/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <TeamShotDistanceGraph data={$awayTeamShotDistanceData}/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <TeamShotDistanceGraph data={$homeTeamShotDistanceData}/>
                </div>
            </div>
        </div>
        </Route>

        <Route path="player-charts">
    <div class="row">
        <div class="col">
            <TeamInfo team={$boxScore.awayTeam}/>
            <PlayerList players={$awayPlayers}/>
        </div>
        <div class="col">
            <TeamInfo team={$boxScore.homeTeam}/>
            <PlayerList players={$homePlayers}/>
        </div>
     </div>
    <div class="row">
        <div class="col">
            <PlayerGameDetail player={$player}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <PlayerPeriodBarCharts data={$periodBarChartsGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <AssistDistributionGraph data={$assistDistributionGraphData}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <TeamShotDistanceGraph data={$playerShotDistanceData}/>
        </div>
    </div>
        </Route>
        <Route path="box-score">
        <div class="row">
            <div class="col">
                <BoxScore boxScore={$boxScore}/>
            </div>
        </div>
        </Route>
        <Route path="timeout-analysis">

        <div class="row">
            <div class="col">
                <TimeoutAnalysis timeoutAnalysis={$timeoutAnalysis} boxScore={$boxScore}/>
            </div>
        </div>
        </Route>
        </Route>
    </Router>
</main>
</div>
