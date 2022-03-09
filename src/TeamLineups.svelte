<script>
    import {hexToRgba} from "./hex-to-rgb";
    import {onMount, afterUpdate} from "svelte";
    import {chartConfig, layoutConfig} from "./plotly";

    export let data, textListName, hoverListName, title, alphaColorListName;
    let container;

    function showLineupGraph(lineups, box, lineupIntervals, lineupIntervalsText) {
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        const traces = lineups.reverse().map((l, index) => {
            const trace = {
                x: l.values,
                y: [box.awayTeam.teamName, box.homeTeam.teamName],
                name: '',
                text: l[textListName],
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: 'text',
                hovertext: l[hoverListName],
                hovertemplate: '%{hovertext}',
                hovermode: 'x unified',
                marker: {
                    color: {},
                    width: 1,
                    line: {color: 'rgba(177, 177, 177, .9)', width: 1}
                },
                type: 'bar'
            };
            if (alphaColorListName) {
                trace.marker.color = [hexToRgba(box.awayTeam.color, l[alphaColorListName][0]), hexToRgba(box.homeTeam.color, l[alphaColorListName][1])]
            } else {
                trace.marker.color = [hexToRgba(box.awayTeam.color), hexToRgba(box.homeTeam.color)]
            }
            return trace;
        });
        var layout = {
            title:title,
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
