<script>
    import {onMount} from "svelte";
    import dayjs from "dayjs";
    let dates = [];

    export let dateSetHandler;
    function getDatesToDisplay() {
        const dates = [];
        for (let i = 0; i != 10; i++) {
            dates.push(dayjs().subtract(i, 'day'))
        }
        return dates.reverse();
    }

    onMount(async () => {
        dates = getDatesToDisplay();
    });
</script>
<div class="row">
    <div class="col text-center">
        <div class="btn-group" role="group" aria-label="Basic outlined example">
            {#each dates as d}
                <button on:click={e => dateSetHandler(e.target.value)} type="button" value="{d.format('YYYY-MM-DD')}" class="btn btn-outline-primary">{d.format('ddd, MMM D')}</button>
            {/each}
        </div>
    </div>
</div>
