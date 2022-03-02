<script>
    import {hexToRgba} from "./hex-to-rgb";
    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";

    export let data;
    let container;

    function showLineupGraph(lineups, box, lineupIntervals, lineupIntervalsText) {
        const awayTeamColor = hexToRgba(box.awayTeam.color);
        const homeTeamColor = hexToRgba(box.homeTeam.color);
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        const traces = lineups.reverse().map(l => {
            return {
                x: l.values,
                y: [box.awayTeam.teamName, box.homeTeam.teamName],
                name: '',
                text: l.labels,
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: 'text',
                hovertext: l.summary,
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
        if (data && data.lineups) {
            showLineupGraph(data.lineups, data.boxScore, data.lineupIntervals, data.lineupIntervalsText);
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
