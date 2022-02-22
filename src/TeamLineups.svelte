<script>
    import {hexToRgba} from "./hex-to-rgb";
    import {onMount, afterUpdate} from "svelte";

    export let data;
    let container;

    function showLineupGraph(lineups, box, lineupIntervals, lineupIntervalsText) {
        const awayTeamColor = hexToRgba(box.awayTeam.color);
        const homeTeamColor = hexToRgba(box.homeTeam.color);
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        const traces = lineups.map(l => {
            return {
                x: l.values.reverse(),
                y: [box.homeTeam.teamName, box.awayTeam.teamName],
                name: '',
                text: l.labels.reverse(),
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: 'text',
                hovertext: l.summary.reverse(),
                hovertemplate: '%{hovertext}',
                hovermode: 'x unified',
                marker: {
                    color: [homeTeamColor, awayTeamColor],
                    width: 1,
                    line: {color: 'rgba(177, 177, 177, .9)', width: 1}
                },
                type: 'bar'
            };
        });
        var layout = {
            title: 'Team Lineups',
            barmode: 'stack',
            showlegend: false,
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

        Plotly.newPlot(child, traces, layout);
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
