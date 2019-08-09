<script>
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Link from "../components/Link.svelte";
    import {display, user} from "../store/store";
    import Request from "../api-utiles/Request";

    let loading = false;
    let error = false;

    const handleClickRegistration = _ => {
        display.update(value => {
            return {...value, registration: true, login: false};
        })
    }

    const handleSubmit = event => {
        loading = true;
        let request = new Request('/login', 'POST', new FormData(event.target));
        request.send()
            .then(res => {
                document.cookie = "token=" + res.access_token + "; sessoin=true; path=/";
                user.update(value => {
                    return {...value, status: 'logged', token: res.access_token, data: res.user};
                })
                display.update(value => {
                    return {...value, login: false, dashboard: true};
                })
                loading = false;
                error = false;
                event.target.reset();
            })
            .catch(err => {
                loading = false;
                error = true;
            })
    }
</script>


<div class="modal bg-white p-4 w-1/3 rounded-lg shadow-lg">
    <h2 class="text-blue-400 font-bold text-xl text-center mb-4">Se connecter</h2>

    <form action="" on:submit|preventDefault={handleSubmit}>
        <Input label="Votre email :" type="text" id="login_email" name="username" placeholder="demo-nemo@email.com" />
        <Input label="Votre mot de passe :" type="password" id="login_password" name="password" placeholder="••••••••••" />
        {#if (error)}
            <div>
                <p class="text-red-500 font-bold">Email ou mot de passe incorrect !</p>
            </div>
        {/if}
        
        <div class="flex justify-center mt-4 items-center">
            <div class="mr-4">
                <Link text="S'inscrire" color="blue" click={handleClickRegistration} />
            </div>
            <Button text="Connexion" type="submit" loading={loading} />
        </div>
    </form>
</div>