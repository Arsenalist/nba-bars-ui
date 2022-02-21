<script lang="ts">
    import Nav from "./Nav.svelte";

    const endpoint = "NBA_API_ENDPOINT";
    import dayjs from 'dayjs'
    import duration from 'dayjs/plugin/duration';

    dayjs.extend(duration)

    let promise;
    let awayPlayers = []
    let homePlayers = []
    let boxScore = {};
    let currentPlayer = {};
    let currentGameId = undefined;
    let differentialData, lineupGraphData, awayPlayersLineupGraphData, homePlayersLineupGraphData;
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
        showGraphForPlayer(promise.groupLabels, promise.chartLabels, player);
        showAssistDistributionGraphForPlayer(player.player, promise.awayTeam.assistDistribution.concat(promise.homeTeam.assistDistribution));
    }

    let container;
    let assistDistributionContainer;
    let selectedDate;

    async function setDate(d) {
        boxScore = {};
        awayPlayers = [];
        homePlayers = [];
        currentPlayer = {};
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

    function showAssistDistributionGraphForPlayer(player, allAssistDistributions) {
        const pad = allAssistDistributions.find(ad => ad.player.personId === player.personId);
        var data = [{
            values: pad.assistScorers.map(s => s.numberOfAssists),
            labels: pad.assistScorers.map(s => s.player.name),
            textinfo: "label+value",
            type: 'pie',
            hole: .4,
            name: 'name',
            domain: {column: 0},
        }];

        var layout = {
            title: `${player.statistics.assists} Assists`,
            showlegend: false
        };

        Plotly.newPlot(assistDistributionContainer, data, layout);
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

    function showGraphForPlayer(groupLabels, chartLabels, player) {
        container.innerHTML = '';
        for (let i = 0; i < player.positiveLabels.length; i++) {
            const child = document.createElement('div');
            child.setAttribute('class', 'col-lg-6')
            container.appendChild(child);
            const trace1 = {
                x: groupLabels,
                y: player.positiveValues[i],
                name: 'Trace1',
                type: 'bar',
                textposition: 'auto',
                marker: {color: 'green'},
                text: player.positiveValues[i].map(p => `${p} ${player.positiveLabels[i]}`),
            };
            const trace2 = {
                x: groupLabels,
                y: player.negativeValues[i],
                name: 'Trace2',
                type: 'bar',
                textposition: 'auto',
                marker: {color: 'red'},
                text: player.negativeValues[i].map(p => `${p} ${player.negativeLabels[i]}`),
            };


            const data = [trace1, trace2];
            const layout = {
                //xaxis: {title: p.periodLabel},
                yaxis: {title: 'Value'},
                barmode: 'grouped',
                title: chartLabels[i],
                showlegend: false,
                responsive: true
            };

            new Plotly.newPlot(child, data, layout);
        }
    }


    function tabSelected(tab: string) {
        console.log("setting selected tab to ", tab);
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
        <div class="col-2">
            <div class="row">
                <div class="col">
                    <TeamInfo team={boxScore.awayTeam}/>
                    <PlayerList players={awayPlayers} playerSelected={playerSelected}/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <TeamInfo team={boxScore.homeTeam}/>
                    <PlayerList players={homePlayers} playerSelected={playerSelected}/>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <PlayerGameDetail player={currentPlayer.player}/>
                </div>
            </div>
            <div class="row" bind:this={container}/>
            <div class="row">
                <div class="col" bind:this={assistDistributionContainer}>

                </div>
            </div>
        </div>
    </div>
        <BoxScore boxScore={boxScore}/>
</main>
</div>


</body>
</html>
