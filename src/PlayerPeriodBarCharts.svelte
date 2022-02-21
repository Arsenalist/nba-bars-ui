<script>
    import {onMount} from "svelte";

    export let data;

    $: {
        if (data && data.player) {
            showGraphForPlayer(data.player, data.chartLabels, data.player);
        }
    }
    let container;
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
        if (data && data.player) {
            showGraphForPlayer(data.player, data.chartLabels, data.player);
        }
    });

</script>
<div bind:this={container}/>
