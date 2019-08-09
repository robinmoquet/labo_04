<script>
    import { beforeUpdate } from 'svelte';
    import Icon from './Icon.svelte';

    export let icon;
    export let  loading = false;
    export let click = null;
    export let color = 'green';
</script>

<div class="relative inline-block">
    <button class="button-icon bg-{color}-400 hover:bg-{color}-500" on:click={click} type='button'>
        <i class="material-icons text-gray-200">{icon}</i>
    </button>
</div>