<script>
    import {onMount} from "svelte";
    export let data;

    let container;

    $: {
        if (data && data.player) {
            showAssistDistributionGraphForPlayer(data.player, data.allAssistDistributions);
        }
    }

    function showAssistDistributionGraphForPlayer(player, allAssistDistributions) {
        console.log("shoting assits")
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

        Plotly.newPlot(container, data, layout);
    }

    onMount(async () => {
        if (data && data.playerLineups) {
            showAssistDistributionGraphForPlayer(data.player, data.allAssistDistributions);
        }
    });

</script>
<div bind:this={container}/>
