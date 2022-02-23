<script>
    import {onMount, afterUpdate} from "svelte";
    import {hexToRgba} from "./hex-to-rgb";

    export let data;
    let container;

    function showTeamComparisonByPeriodGraph(data) {
        const away = {
            x: data.lineupIntervalsText,
            y: data.awayData,
            type: 'bar',
            text: data.awayData.map( d => `${data.boxScore.awayTeam.teamTricode}, ${d}`),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: hexToRgba(data.boxScore.awayTeam.color)
            }
        };

        const home = {
            x: data.lineupIntervalsText,
            y: data.homeData,
            type: 'bar',
            text: data.homeData.map( d => `${data.boxScore.homeTeam.teamTricode}, ${d}`),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
                color: hexToRgba(data.boxScore.homeTeam.color)
            }
        };

        const layout = {
            title: `${data.title} (${showGameStat(data.boxScore)})`,
            showlegend: false
        };

        Plotly.newPlot(container, [ away, home ], layout);

    }

    function showGameStat(boxScore) {
        return `${boxScore.awayTeam.teamTricode} ${boxScore.awayTeam.statistics[data.teamStatistic]}, ${boxScore.homeTeam.teamTricode} ${boxScore.homeTeam.statistics[data.teamStatistic]}`;
    }

    function showGraph() {
        if (data && data.awayData) {
            showTeamComparisonByPeriodGraph(data);
        }
    }
    afterUpdate(() => {
        showGraph();
    });

    onMount(() => {
        showGraph();
    });

</script>
<div bind:this={container}/>
