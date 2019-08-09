<script>
    import IconButton from './IconButton.svelte';
    import Icon from './Icon.svelte';
    import { user, todos } from '../store/store';
    import Request from '../api-utiles/Request';

    export let todo;

    let userValue;
    user.subscribe(value => userValue = value);
    $: bg = todo.status === 'completed' ? 'bg-gray-300' : 'bg-gray-200';
    $: shadow = todo.status === 'completed' ? '' : 'shadow-lg';

    const handleRemove = event => {
        let id = todo.id;
        let request = new Request('/todos/' + id, 'DELETE', null, {}, userValue.token);
        request.send()
            .then(res => {
                todos.update(value => value.filter(el => el.id !== id));
            })
    }

    const handleClickStatus = event => {
        let id = todo.id;
        let data = new FormData();
        data.set('status', todo.status === 'todo' ? 'completed' : 'todo');
        let request = new Request('/todos/' + id, 'PATCH', data, {}, userValue.token);
        request.send()
            .then(res => {
                todos.update(value => {
                    let item = value.find(el => el.id === id)
                    item.status = todo.status === 'todo' ? 'completed' : 'todo';
                    return [...value.filter(el => el.id !== id), item]
                });
            })
    }

</script>

<section class="{shadow} {bg} p-4 my-4 rounded-lg flex justify-between items-center">
    <IconButton icon={todo.status === 'completed' ? 'check' : 'close'} color={todo.status === 'completed' ? 'green' : 'red'} click={handleClickStatus} />
    <div class="flex items-center w-full justify-between mx-4">
        <p class="text-gray-600 font-bold text-md w-3/4">{todo.topic}</p>
        <p class="text-gray-500">Priorité : <span class="font-bold text-red-500">{todo.priority}</span></p>
    </div>
    <div class="flex">
        <Icon icon='delete' color='red' click={handleRemove} />
    </div>
</section>