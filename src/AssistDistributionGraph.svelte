<script>
    import {onMount, afterUpdate} from "svelte";
    export let data;

    let container;

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
            title: `Assist Distribution (${player.statistics.assists} AST)`,
            showlegend: false
        };

        Plotly.newPlot(container, data, layout);
    }

    function showGraph() {
        if (data && data.player) {
            showAssistDistributionGraphForPlayer(data.player, data.allAssistDistributions);
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
