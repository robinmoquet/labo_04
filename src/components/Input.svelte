<script>
    const {type, label, id, placeholder = "", name} = $$props;
    let marginBottom = label ? 'mb-4' : '';
</script>

<div class="flex flex-col {marginBottom}">
    {#if label}
    <label for={id} class="text-gray-500 font-bold">
        {label}
    </label>
    {/if}
    <input class="shadow-inner rounded bg-gray-200 py-1 px-2 text-gray-700 my-2"
        id={id} type={type} placeholder={placeholder} name={name}>
</div>