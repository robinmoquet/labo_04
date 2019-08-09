<script>
    import Button from "./components/Button.svelte";
    import Link from "./components/Link.svelte";
    import { display, user } from "./store/store";

    let userValue;
    user.subscribe(value => userValue = value);

    const handleClickLogin = _ => {
        display.update(value => {
            return {...value, login: true, registration: false};
        })
    }
    const handleClickRegistration = _ => {
        display.update(value => {
            return {...value, registration: true, login: false};
        })
    }
    const handleClickLogout = _ => {
        document.cookie = 'token=';
        user.update(value => {
            return {...value, status: 'anon', token: null, data: {}};
        })
    }

</script>

<div class="wrapper">
    <nav class="my-8 rounded-lg shadow-lg p-4 flex justify-between items-center bg-white">
        <h2 class="font-bold text-2xl text-gray-500">
            {#if (userValue.status === "logged")}Bonjour, {userValue.data.firstname} {userValue.data.lastname}{:else}Labo 04{/if}
        </h2>
        <section class="flex items-center">
            {#if (userValue.status === 'logged')}
                <div class="ml-2">
                    <Button text="Déconnexion" loading={false} click={handleClickLogout} />
                </div>
            {:else}
                <div class="mr-2">
                    <Link text="Connexion" color="blue" click={handleClickLogin} />
                </div>
                <div class="ml-2">
                    <Button text="Inscription" loading={false} click={handleClickRegistration} />
                </div>
            {/if}
        </section>
    </nav>
</div>
