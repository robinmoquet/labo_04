<script>
    const {text} = $$props;

    let className = "button";

    function handleClick() {
        className = "button loading";
        setTimeout(() => {
            className = "button";
        }, 3000);
    }
</script>

<div class="relative inline-block">
    <button class={className} on:click={handleClick}>
        <span>
            {text}
        </span>
    </button>
</div>