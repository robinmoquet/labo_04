<script>
	import Navbar from './Navbar.svelte';
	import Button from './components/Button.svelte';
	import Login from "./pages/Login.svelte";
	import Registration from "./pages/Registration.svelte";
	import { display, user } from "./store/store";
	import Request from "./api-utiles/Request";
	import TodoList from './pages/TodoList.svelte';

	let displayValue;
	let userValue;

	display.subscribe(value => displayValue = value);
	user.subscribe(value => userValue = value);

	let cookie = document.cookie;
	cookie = cookie.split('=');

	if(cookie[0] === 'token' && cookie[1] !== "" && userValue.status === 'anon') {
		let request = new Request('/me', 'GET', null, {}, cookie[1]);
		request.send()
			.then(res => {
				user.update(value => {
					return {...value, status: 'logged', token: cookie[1], data: res};
				})
				display.update(value => { return {...value, dashboard: true} });
			})
	}
	

	/*let res = '';
	let color = '#ed8936';
	let nb = 60;
	for(let i = 1; i < nb; i++) {
		if(i === nb - 1) res += `${i}px ${i}px 0px ${color};`
		else res += `${i}px ${i}px 1px ${color}, `;
	}
	console.log(res);*/


</script>


<Navbar />

<div class="absolute w-full">
	<div class="wrapper flex justify-end">
		{#if displayValue.login}
			<Login />
		{/if}
		{#if displayValue.registration}
			<Registration />
		{/if}
	</div>
	<div class="wrapper flex justify-center">
		{#if userValue.status === 'logged'}
			<TodoList />
		{/if}
	</div>
</div>

<div class="wrapper">
	<div class="main-title">
		<h1 class="main-title text-center font-black">ToDo your life !</h1>
	</div>
</div>
<div class="fixed bottom-0 mb-8 w-full">
	<p class="text-center">
		<span class="text-gray-600">
			Lire le 
			<a href="https://github.com/robinmoquet/labo_04/blob/master/README.md" target="_blank" class="text-blue-400 hover:text-blue-500 font-bold">
				README.md
			</a> 
			du Labo 04
		</span>
	</p>
</div>
