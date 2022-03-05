<script>
    import {hexToRgba} from "./hex-to-rgb";
    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";
    export let data;

    let container;

    function showPlayerLineupGraph(lineups, team, lineupIntervals, lineupIntervalsText) {
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        const traces = lineups.map(l => {
            const trace = {
                x: l.map(v => v.duration).reverse(),
                y: team.players.map(p => p.nameI).reverse(),
                name: '',
                text: l.map(v => v.inLineup ? v.usageLabel : '').reverse(),
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: l.map(v => v.inLineup ? 'text' : 'none').reverse(),
                hovertext: l.map(v => v.inLineup ? v.usageDetail : '').reverse(),
                hovertemplate: l.map(v => v.inLineup ? '%{hovertext}' : '').reverse(),
                marker: {
                    color: team.color,
                },
                type: 'bar'
            };
            console.log("passing to ", l.usageRateAlphaColor);
            trace.marker.color = l.map(v => v.inLineup ? hexToRgba(team.color, v.usageRateAlphaColor) : 'rgba(255,255,255,0)').reverse();
            return trace;
        });
        var layout = {
            title: team.teamName,
            barmode: 'stack',
            ...layoutConfig(),
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

        Plotly.newPlot(child, traces, layout, chartConfig());
    }

    function showGraph() {
        if (data && data.playerLineups) {
            showPlayerLineupGraph(data.playerLineups, data.team, data.lineupIntervals, data.lineupIntervalsText);
        }
    }
    afterUpdate( () => {
        showGraph();
    });
    onMount( () => {
        showGraph();
    });

</script>
<p>
    This data may very well have bugs. Consider this BETA for sure.
</p>
<div bind:this={container}/>
