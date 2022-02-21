<script>
    import {hexToRgba} from "./hex-to-rgb";
    import {onMount} from "svelte";
    export let data;

    let container;


    $: {
        if (data && data.playerLineups) {
            showPlayerLineupGraph(data.playerLineups, data.team, data.lineupIntervals, data.lineupIntervalsText);
        }
    }
    function showPlayerLineupGraph(lineups, team, lineupIntervals, lineupIntervalsText) {
        container.innerHTML = '';
        const child = document.createElement('div');
        container.appendChild(child);
        const traces = lineups.map(l => {
            const trace = {
                x: l.map(v => v.duration).reverse(),
                y: team.players.map(p => p.nameI).reverse(),
                name: '',
                text: l.map(v => v.inLineup ? v.formattedLabel : '').reverse(),
                orientation: 'h',
                textposition: 'inside', insidetextanchor: 'middle',
                hoverinfo: l.map(v => v.inLineup ? 'text' : 'none').reverse(),
                hovertext: l.map(v => v.inLineup ? v.formattedDetail : '').reverse(),
                hovertemplate: l.map(v => v.inLineup ? '%{hovertext}' : '').reverse(),
                marker: {
                    color: team.color,
                },
                type: 'bar'
            };
            trace.marker.color = l.map(v => v.inLineup ? hexToRgba(team.color) : 'rgba(255,255,255,0)').reverse();
            return trace;
        });
        var layout = {
            title: team.teamName,
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

    onMount(async () => {
        if (data && data.playerLineups) {
            showPlayerLineupGraph(data.playerLineups, data.team, data.lineupIntervals, data.lineupIntervalsText);
        }
    });

</script>
<div bind:this={container}/>
