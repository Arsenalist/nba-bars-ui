<script>
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import x from 'dayjs/plugin/utc';
    dayjs.extend(x)

    import {selectedDate} from "./stores/ui-elements";
    import {boxScore} from "./stores/singe-game";

    let dates = [];

    function getDefaultDatesToDisplay() {
        const dates = [];
        for (let i = 0; i !== 10; i++) {
            dates.push(dayjs().subtract(i, 'day'))
        }
        return dates.reverse();
    }

    function setDefaultDateIfNoneExists() {
        if ($boxScore && !$selectedDate) {
            const utc = dayjs.utc(boxScore.gameTimeUTC);
            selectedDate.set(utc.format('YYYY-MM-DD'));
        } else if (!$boxScore && !$selectedDate) {
            selectedDate.set(dayjs().format('YYYY-MM-DD'));
        }
    }

    function dateSetHandler(date) {
        selectedDate.set(date);
    }

    onMount(async () => {
        setDefaultDateIfNoneExists();
        dates = getDefaultDatesToDisplay();
    });
</script>
<div class="row">
    <div class="col text-center">
        <div class="btn-group date-list btn-group-sm" role="group" aria-label="Basic outlined example">
            {#each dates as d}
                <button on:click={e => dateSetHandler(e.target.value)} type="button" value="{d.format('YYYY-MM-DD')}" class="btn text-nowrap btn-outline-primary">{d.format('ddd, MMM D')}</button>
            {/each}
        </div>
    </div>
</div>
