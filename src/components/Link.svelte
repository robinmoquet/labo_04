<script>
    const {text, color, click, link = "#"} = $$props;
</script>


<a on:click={click} href={link} class="font-bold tracking-wider text-{color}-400 hover:text-{color}-500">
    {text}
</a>