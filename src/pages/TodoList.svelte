<script>
    import { onMount, beforeUpdate } from 'svelte';
    import { todos, user } from '../store/store';
    import Todo from '../components/Todo.svelte';
    import Input from '../components/Input.svelte';
    import Button from '../components/Button.svelte';
    import Link from '../components/Link.svelte';
    import Request from '../api-utiles/Request';

    let userValue;
    let todosValue = [];
    let loading = false;
    let statusDisplay = 'all';

    $: displayTodos = todosValue.filter(el => {
        if(statusDisplay === 'all') return el;
        if (el.status === statusDisplay) return el;
    }).sort((el1, el2) => {
        return el1.priority === el2.priority ? 0 : (el1.priority < el2.priority ? 1 : -1);
    });

    onMount(async () => {
        user.subscribe(value => userValue = value);
        let request = new Request('/todos', 'GET', null, {}, userValue.token);
        request.send()
            .then(res => {
                if(res.length === 0) {
                    todos.update(value => [{topic: 'Écrire une première tâche', priority: 10, status: 'todo'}]);
                } else {
                    todos.update(value => [...res]);
                }
            }).finally(() => {
                todos.subscribe(value => todosValue = value);
            }); 
    });

    const handleSubmitAddTodo = event => {
        loading = true;
        let request = new Request('/todos', 'POST', new FormData(event.target), {}, userValue.token);
        request.send()
            .then(res => {
                todos.update(value => [...value, res])
            }).finally(() => {
                event.target.reset();
                setTimeout(() => {
                    loading = false;
                }, 500)
            });
    }

</script>

<div class="w-2/3 bg-white p-4 rounded-lg shadow-lg">
    <h3 class="font-bold text-blue-400 text-2xl mb-2">Ajouter une nouvelle tâche</h3>
    <form action="" on:submit|preventDefault={handleSubmitAddTodo} class="flex items-center mb-8">
        <div class="w-full flex mr-4">
            <div class="w-4/5 mr-2">
                <Input name="topic" placeholder="Faire quelque chose ..." />
            </div>
            <div class="w-1/5">
                <Input name="priority" placeholder="priorité..." type="number" />
            </div>
        </div>
        <Button text="Ajouter" type="submit" loading={loading} />
    </form>
    <div>
        {#each displayTodos as todo}
            <Todo todo={todo} />
        {/each}
    </div>
    <div class="flex justify-around my-8">
        <Link text="Tous" color={statusDisplay === 'all' ? 'blue' : 'gray'} click={() => statusDisplay = 'all'} />
        <Link text="A faire" color={statusDisplay === 'todo' ? 'blue' : 'gray'} click={() => statusDisplay = 'todo'} />
        <Link text="Complétées" color={statusDisplay === 'completed' ? 'blue' : 'gray'} click={() => statusDisplay = 'completed'} />
    </div>
</div>