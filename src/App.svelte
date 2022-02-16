<script lang="ts">
    import Nav from "./Nav.svelte";

    const endpoint = "NBA_API_ENDPOINT";
    import dayjs from 'dayjs'
    import duration from 'dayjs/plugin/duration';
    dayjs.extend(duration)

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
        showPlayerLineupGraph(awayTeamLineupContainer, promise.awayPlayerLineups, promise.boxScore.awayTeam, promise.lineupIntervals, promise.lineupIntervalsText);
        showPlayerLineupGraph(homeTeamLineupContainer, promise.homePlayerLineups, promise.boxScore.homeTeam, promise.lineupIntervals, promise.lineupIntervalsText);
    }

    async function playerSelected(personId) {
        const player = awayPlayers.concat(homePlayers).find(p => p.player.personId === personId);
        currentPlayer = player;
        showGraphForPlayer(promise.groupLabels, promise.chartLabels, player);
    }

    let container;
    let lineupContainer;
    let awayTeamLineupContainer;
    let homeTeamLineupContainer;
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

    function showPlayerLineupGraph(teamLineupContainer, lineups, team, lineupIntervals, lineupIntervalsText) {
        teamLineupContainer.innerHTML = '';
        const child = document.createElement('div');
        lineupContainer.appendChild(child);
        const traces = lineups.map(l => {
            const trace = {
                x: l.map(v => v.duration).reverse(),
                y: team.players.map(p => p.nameI).reverse(),
                name: '',
                 text: l.map(v => v.inLineup ? v.duration : '').reverse(),
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: l.map(v => v.inLineup ? 'text' : 'none').reverse(),
                hovertext: l.map(v => v.inLineup ? secondsToDuration(v.duration) + '<br>' + toHtml(v.lineupStats) : '').reverse(),
                hovertemplate: l.map(v => v.inLineup ? '%{hovertext}' : '').reverse(),
                marker: {
                    color: team.color,
                },
                type: 'bar'
            };
            trace.marker.color = l.map(v => v.inLineup ? hexToRgba(team.color) : 'rgba(255,255,255,0)').reverse();
            return trace;
        });
        var layout = {
            title: team.teamName,
            barmode: 'stack',
            showlegend: false,
            hovermode: 'closest',
            xaxis: {
                ticktext: lineupIntervalsText,
                tickvals: lineupIntervals,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#222',
                gridcolor: '#222',
                gridwidth: 4
            }
        };

        Plotly.newPlot(child, traces, layout);

    }

    import GameList from "./GameList.svelte";
    import TeamInfo from "./TeamInfo.svelte";
    import PlayerGameDetail from "./PlayerGameDetail.svelte";
    import PlayerList from "./PlayerList.svelte";

    function showLineupGraph(lineups, box, lineupIntervals, lineupIntervalsText) {
        const awayTeamColor = hexToRgba(box.awayTeam.color);
        const homeTeamColor = hexToRgba(box.homeTeam.color);
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
                    color: [awayTeamColor, homeTeamColor],
                    width: 1,
                    line: {color: 'rgba(177, 177, 177, .9)', width: 1}
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
                tickcolor: '#222',
                gridcolor: '#222',
                gridwidth: 4
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

    function hexToRgba(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const rgba = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: .9
        } : {
            r: 22,
            g: 22,
            b: 22,
            a: .9
        };
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }


    const toHtml = (stats) => {
        return `${stats.points} PTS<br>${stats.assists} AST<br>${stats.rebounds} REB<br>${stats.blocks} BLK`;
    }

    const secondsToDuration = (seconds) => {
        return dayjs.duration(seconds, 'seconds').format("m:ss");
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
    <main class="row">
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
            <div class="row" bind:this={awayTeamLineupContainer}/>
            <div class="row" bind:this={homeTeamLineupContainer}/>
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

</main>
</div>


</body>
</html>
