<script>
    import { useParams } from "svelte-navigator";
    import {onMount } from "svelte";
    import {gameData} from "./stores/singe-game";
    import {getNbaBars} from "./nba-bars.service";
    import {selectedTab} from "./stores/ui-elements";

    const params = useParams();

    onMount( async () => {
        if ($params.gameId !== undefined) {
            gameData.set(await getNbaBars($params.gameId));
        }
        if ($params['*'] !== undefined) {
            selectedTab.set($params['*']);
        }
    });

</script>
