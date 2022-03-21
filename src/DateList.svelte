<script>
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    import {selectedDate} from "./stores/ui-elements";
    let dates = [];
    function getDatesToDisplay() {
        const dates = [];
        for (let i = 0; i != 10; i++) {
            dates.push(dayjs().subtract(i, 'day'))
        }
        return dates.reverse();
    }

    function dateSetHandler(date) {
        selectedDate.set(date);
    }

    onMount(async () => {
        dates = getDatesToDisplay();
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
