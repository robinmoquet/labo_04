<script>
    export let icon;
    export let click = null;
    export let color = 'blue';
</script>

<i class="material-icons text-gray-600 hover:text-{color}-500" on:click={click}>{icon}</i>