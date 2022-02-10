<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


</svelte:head>
<script lang="ts">
    const endpoint = "NBA_API_ENDPOINT";
    import dayjs from 'dayjs'

    let dates = [];

    function getDatesToDisplay() {
        const dates = [];
        for (let i = 0; i != 5; i++) {
            dates.push(dayjs().subtract(i, 'day'))
        }
        return dates.reverse();
    }

    let promise;
    let awayPlayers = []
    let homePlayers = []
    let boxScore = {};
    let currentPlayer = {};

    async function gameSelected(gameId) {
        promise = await getNbaBars(gameId);
        awayPlayers = promise.awayTeam.players;
        homePlayers = promise.homeTeam.players;
        boxScore = promise.boxScore;
        showLineupGraph(promise.lineups, promise.boxScore, promise.lineupIntervals, promise.lineupIntervalsText);
    }

    async function playerSelected(personId) {
        const player = awayPlayers.concat(homePlayers).find(p => p.player.personId === personId);
        currentPlayer = player;
        showGraphForPlayer(promise.groupLabels, promise.chartLabels, player);
    }

    let container;
    let lineupContainer;
    let games = [];

    import {onMount} from 'svelte';


    async function setDate(e) {
        boxScore = {};
        awayPlayers = [];
        homePlayers = [];
        currentPlayer = {};
        container.innerHTML = '';
        games = await getGames(e.target.value);
    }

    async function getGames(date) {
        const res = await fetch(`${endpoint}/games/${date}`)
        if (res.ok) {
            if (res.ok) {
                return await res.json();
            } else {
                throw new Error("problem");
            }
        }
    }

    //
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
    function showLineupGraph(lineups, box, lineupIntervals, lineupIntervalsText) {
        lineupContainer.innerHTML = '';
        const child = document.createElement('div');
        lineupContainer.appendChild(child);
        const traces = lineups.map(l => {
            return {
                x: l.values.reverse(),
                y: [box.homeTeam.teamName, box.awayTeam.teamName],
                name: '',
                text: l.labels.reverse(),
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: 'text',
                hovertext: l.summary.reverse(),
                hovertemplate: '%{hovertext}',
                hovermode: 'x unified',
                marker: {
                    color: 'rgba(0, 0, 0,0.6)',
                    width: 1,
                    line: { color: 'rgb(255, 255, 255)', width: 5 }
                },
                type: 'bar'
            };
        });
        var layout = {
            title: 'Team Lineups',
            barmode: 'stack',
            showlegend: false,
            hovermode: 'closest',
            xaxis: {
                ticktext: lineupIntervalsText,
                tickvals: lineupIntervals,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#c41141'
            }
        };

        Plotly.newPlot(child, traces, layout);

    }
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


    onMount(async () => {
        dates = getDatesToDisplay();
        return;

    });
</script>

<html>
<head>
    <title>Barchart Demo</title>
</head>
<body>

<div class="container">

    <div class="row">
        <div class="col text-center">
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                {#each dates as d}
                    <button on:click={setDate} type="button" value="{d.format('YYYY-MM-DD')}" class="btn btn-outline-primary">{d.format('ddd, MMM D')}</button>
                {/each}
            </div>
        </div>
    <div class="row">
        <div class="col text-center d-flex justify-content-center">
            <GameList games={games} gameSelected={gameSelected}/>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="row" bind:this={lineupContainer}/>
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
                    <PlayerGameDetail player={currentPlayer}/>
                </div>
            </div>
            <div class="row" bind:this={container}/>
        </div>
    </div>

</div>



</body>
</html>
