<script>

    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";

    export let data;
    let container;


    function showDifferentialGraph(differential, lineupIntervals, lineupIntervalsText, boxScore) {
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        var trace1 = {
            x: differential.map(d => d.elapsedTimeInSeconds),
            y: differential.map(d => d.awayMinusHomeDifference),
            type: "scatter",
            line: {shape: 'spline', color: "black"},
            hoverinfo: 'text',
            hovertext: differential.map(d => d.summary),
            hovertemplate: '%{hovertext}<extra></extra>'

        };
        const yMax = Math.max(...trace1.y);
        const yMin = Math.min(...trace1.y);
        var layout = {
            title: 'Lead Changes',
            hovermode: 'closest',
            ...layoutConfig(),
            xaxis: {
                linecolor: differential.map(d => Math.random() < 0.5 ? "red" : "green"),
                ticktext: lineupIntervalsText,
                tickvals: lineupIntervals,
                gridcolor: '#222',
                gridwidth: 2

            },
            yaxis: {
                ticktext: [`${boxScore.awayTeam.teamName} (${yMax})`, "0", `${boxScore.homeTeam.teamName} (${Math.abs(yMin)})`],
                tickvals: [yMax, 0, yMin],
            }
        };

        var data = [trace1];

        Plotly.newPlot(child, data, layout, chartConfig());
    }

    function showGraph() {
        if (data && data.differential) {
            showDifferentialGraph(data.differential, data.lineupIntervals, data.lineupIntervalsText, data.boxScore);
        }
    }

    onMount(() => {
        showGraph();
    });
    afterUpdate(async () => {
        showGraph();
    });
</script>
<div bind:this={container}/>
