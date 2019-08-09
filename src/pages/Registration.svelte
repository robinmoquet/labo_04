<script>
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import Link from "../components/Link.svelte";
    import {display} from "../store/store";
    import Request from "../api-utiles/Request";

    let loading = false;
    
    const handleClickLogin = _ => {
        display.update(value => {
            return {...value, login: true, registration: false};
        })
    }

    const handleSubmit = event => {
        loading = true;
        let request = new Request('/users', 'POST', new FormData(event.target));
        request.send()
            .then(res => {
                loading = false;
                console.log(res);
                event.target.reset();
            })
    }
</script>


<div class="modal bg-white p-4 w-1/3 rounded-lg shadow-lg">
    <h2 class="text-blue-400 font-bold text-xl text-center mb-4">S'inscrire</h2>

    <form action="" on:submit|preventDefault={handleSubmit}>
        <Input label="Votre prénom :" type="text" id="registration_firstname" name="firstname" placeholder="Demo" />
        <Input label="Votre nom :" type="text" id="registration_lastname" name="lastname" placeholder="Nemo" />
        <Input label="Votre email :" type="text" id="registration_email" name="email" placeholder="demo-nemo@email.com" />
        <Input label="Votre mot de passe :" type="password" id="registration_password" name="password" placeholder="••••••••••" />
        <div class="flex justify-center mt-4 items-center">
            <div class="mr-4">
                <Link text="Se connecter" color="blue" click={handleClickLogin} />
            </div>
            <Button text="Inscription" type="submit" loading={loading} />
        </div>
    </form>
</div>