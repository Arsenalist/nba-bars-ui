<script>
    export let gameId;
    export let tabSelected;
    $: current = "game-charts";
    function onTabClick(e) {
        let tabName = e.target.getAttribute("data-tab-name");
        tabSelected(tabName);
        current = tabName;
    }

</script>
{#if gameId}
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="game-charts"
                       class:active="{current === 'game-charts'}"
                       on:click={onTabClick}>Game Charts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="player-charts"
                       class:active="{current === 'player-charts'}"
                       on:click={onTabClick}>Player Charts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="box-score"
                       class:active="{current === 'box-score'}"
                       on:click={onTabClick}>Box Score</a>
                </li>
            </ul>
        </div>
    </div>
{/if}
