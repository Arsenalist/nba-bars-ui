<script>
    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";

    export let data;

    let container;
    function showGraphForPlayer(lineupIntervalsText, chartLabels, player) {
        container.innerHTML = '';
        for (let i = 0; i < player.positiveLabels.length; i++) {
            const child = document.createElement('div');
            container.appendChild(child);
            const trace1 = {
                x: lineupIntervalsText,
                y: player.positiveValues[i],
                type: 'bar',
                hoverinfo: 'none',


                textposition: 'auto',
                marker: {color: 'green'},
                text: player.positiveValues[i].map(p => `${p} ${player.positiveLabels[i]}`),
            };
            const trace2 = {
                x: lineupIntervalsText,
                y: player.negativeValues[i],
                type: 'bar',
                hoverinfo: 'none',
                textposition: 'auto',
                marker: {color: 'red'},
                text: player.negativeValues[i].map(p => `${p} ${player.negativeLabels[i]}`),
            };


            const data = [trace1, trace2];
            const layout = {
                yaxis: {title: 'Value'},
                barmode: 'grouped',
                title: chartLabels[i],
                ...layoutConfig(),
            };

            new Plotly.newPlot(child, data, layout, chartConfig());
        }
    }

    function showGraph() {
        if (data && data.player) {
            showGraphForPlayer(data.lineupIntervalsText, data.chartLabels, data.player);
        }
    }
    onMount(() => {
        showGraph();
    });
    afterUpdate(() => {
        showGraph();
    });


</script>
<div bind:this={container}/>
