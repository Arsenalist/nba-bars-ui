<script>
    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";

    export let data;
    let container;

    function shotTeamShotDistanceGraph(data) {
        var trace1 = {
            x: data.made.map(sd => sd.gameClockInSeconds),
            y: data.made.map(sd => sd.action.shotDistance),
            mode: 'markers',
            type: 'scatter',
            marker: { size: 12, color: "green" },
            hoverinfo: 'text',
            hovertext: data.made.map(sd => `${sd.displayTime}, ${sd.action.shotDistance}' <br>${sd.action.description}`),
            hovertemplate: '%{hovertext}',
            hovermode: 'x unified',

        };

        var trace2 = {
            x: data.missed.map(sd => sd.gameClockInSeconds),
            y: data.missed.map(sd => sd.action.shotDistance),
            mode: 'markers',
            type: 'scatter',
            marker: { size: 12, color: "red" },
            hoverinfo: 'text',
            hovertext: data.missed.map(sd => `${sd.displayTime}, ${sd.action.shotDistance}' <br>${sd.action.description}`),
            hovertemplate: '%{hovertext}<extra></extra>',
            hovermode: 'x unified',
        };

        var layout = {
            title: data.title,
            ...layoutConfig(),
            hovermode: 'closest',
            xaxis: {
                ticktext: data.lineupIntervalsText,
                tickvals: data.lineupIntervals,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#222',
                gridcolor: '#222',
                gridwidth: 4
            }
        };


        Plotly.newPlot(container, [ trace1, trace2 ], layout, chartConfig());

    }

    function showGraph() {
        if (data && data.title) {
            shotTeamShotDistanceGraph(data);
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
