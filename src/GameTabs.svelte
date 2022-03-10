<script>
    export let gameId;
    export let tabSelectedHandler;
    export let selectedTab;
    function onTabClick(e) {
        let tabName = e.target.getAttribute("data-tab-name");
        tabSelectedHandler(tabName);
        selectedTab = tabName;
    }

</script>
{#if gameId}
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="plusMinus"
                       class:active="{selectedTab === 'plusMinus'}"
                       on:click={onTabClick}>Plus/Minus</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="rebounding"
                       class:active="{selectedTab === 'rebounding'}"
                       on:click={onTabClick}>Rebounding</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="ratings"
                       class:active="{selectedTab === 'ratings'}"
                       on:click={onTabClick}>Ratings</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="usage"
                       class:active="{selectedTab === 'usage'}"
                       on:click={onTabClick}>Usage</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"  data-tab-name="scoring"
                       class:active="{selectedTab === 'scoring'}"
                       on:click={onTabClick}>Scoring</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="player-charts"
                       class:active="{selectedTab === 'player-charts'}"
                       on:click={onTabClick}>Player Charts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="box-score"
                       class:active="{selectedTab === 'box-score'}"
                       on:click={onTabClick}>Box Score</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="timeout-analysis"
                       class:active="{selectedTab === 'timeout-analysis'}"
                       on:click={onTabClick}>Timeout Analysis</a>
                </li>
            </ul>
        </div>
    </div>
{/if}
