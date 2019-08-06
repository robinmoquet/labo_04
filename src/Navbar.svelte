<script>
    import Button from "./components/Button.svelte";
    import Link from "./components/Link.svelte";
</script>

<div class="wrapper">
    <nav class="my-8 rounded-lg shadow-lg p-4 flex justify-between items-center bg-white">
        <h2 class="font-bold text-2xl text-gray-500">
            Labo 04
        </h2>
        <section class="flex items-center">
            <div class="mr-2">
                <Link text="Connexion" color="blue" />
            </div>
            <div class="ml-2">
                <Button text="Inscription" />
            </div>
        </section>
    </nav>
</div>
