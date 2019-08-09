<script>
    import { beforeUpdate, afterUpdate } from 'svelte';
    export let loading = false;
    export let text;
    export let type = 'button';
    export let click = null;

    let className = loading ? "button loading" : "button";

    beforeUpdate(() => className = loading ? "button loading" : "button");

</script>

<div class="relative inline-block">
    <button class={className} on:click={click} type={type}>
        <span>
            {text}
        </span>
    </button>
</div>