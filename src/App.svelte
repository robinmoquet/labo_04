<script>
	import Navbar from './Navbar.svelte';
	import Button from './components/Button.svelte';

	export let name = 'world';

	let res = '';
	let color = '#ed8936';
	let nb = 60;
	for(let i = 1; i < nb; i++) {
		if(i === nb - 1) res += `${i}px ${i}px 0px ${color};`
		else res += `${i}px ${i}px 1px ${color}, `;
	}
	//console.log(res);


</script>


<Navbar />
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
