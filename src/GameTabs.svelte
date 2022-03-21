<script>
    import { Link } from "svelte-navigator";
    import {selectedTab} from "./stores/ui-elements";
    function onTabClick(e) {
        selectedTab.set(e.target.getAttribute("data-tab-name"));
    }

</script>
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <Link to="plus-minus">
                    <span class="nav-link" aria-current="page" href="#"  data-tab-name="plus-minus"
                       class:active="{$selectedTab === 'plus-minus'}"
                       on:click={onTabClick}>Plus/Minus</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="rebounding">
                    <span class="nav-link" aria-current="page" href="#"  data-tab-name="rebounding"
                       class:active="{$selectedTab === 'rebounding'}"
                       on:click={onTabClick}>Rebounding</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="ratings">
                    <span class="nav-link" aria-current="page" href="#"  data-tab-name="ratings"
                       class:active="{$selectedTab === 'ratings'}"
                       on:click={onTabClick}>Ratings</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="usage">
                    <span class="nav-link" aria-current="page" href="#"  data-tab-name="usage"
                       class:active="{$selectedTab === 'usage'}"
                       on:click={onTabClick}>Usage</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="scoring">
                    <span class="nav-link" aria-current="page" href="#"  data-tab-name="scoring"
                       class:active="{$selectedTab === 'scoring'}"
                       on:click={onTabClick}>Scoring</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="player-charts">
                    <span class="nav-link" aria-current="page" href="#" data-tab-name="player-charts"
                       class:active="{$selectedTab === 'player-charts'}"
                       on:click={onTabClick}>Player Charts</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="box-score">
                    <span class="nav-link" aria-current="page" href="#" data-tab-name="box-score"
                       class:active="{$selectedTab === 'box-score'}"
                       on:click={onTabClick}>Box Score</span>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="timeout-analysis">
                    <a class="nav-link" aria-current="page" href="#" data-tab-name="timeout-analysis"
                       class:active="{$selectedTab === 'timeout-analysis'}"
                       on:click={onTabClick}>Timeout Analysis</a>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
