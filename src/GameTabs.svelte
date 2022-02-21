<script>
    export let gameId;
</script>
{#if gameId}
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Game Charts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Player Charts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Box Score</a>
                </li>
            </ul>
        </div>
    </div>

{/if}
