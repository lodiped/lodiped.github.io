<script>
	import top1 from '$lib/assets/top1.png';
	import top2 from '$lib/assets/top2.png';
	import top3 from '$lib/assets/top3.png';
	import bg1 from '$lib/assets/bg1.png';
	import bg2 from '$lib/assets/bg2.png';
	import bg3 from '$lib/assets/bg3.png';
	import { onMount } from 'svelte';

	/** @type {string} */
	let lang;

	const hello = [
		'Hello',
		'Bonjour',
		'Hallo',
		'你好',
		'Привет',
		'Oi',
		'Hola',
		'Xin chào',
		'Γειά σου',
		'Nnọọ',
		'नमस्ते',
		'สวัสดี',
		'سلام',
		'ሀሎ',
		'Slav',
		'안녕하세요',
		'Dia dhuit',
		'こんにちは',
		'ສະບາຍດີ',
		'سڵاو',
		'வணக்கம்',
		'مرحبًا'
	];
	let currentHello = 'Olá';
	/** @type {Array<string>} negativeArray */
	let negativeArray = [];

	/** @param {Array<string>} helloArray */
	function getRandomNumber(helloArray) {
		let initIndex;
		if (negativeArray.length === 0) {
			negativeArray = [...helloArray];
		}
		initIndex = Math.floor(Math.random() * negativeArray.length);
		currentHello = negativeArray[initIndex];
		negativeArray.splice(initIndex, 1);
	}

	/////////////////////////////////////////////////////////////////

	let angle = 0;
	let angleBg = 0;
	let mouseAngle = 0;

	/** @param {MouseEvent} event */
	const updateAngle = (event) => {
		updateAngleOnScroll();
		const { clientX, clientY } = event;
		const { innerWidth, innerHeight } = window;

		const xProportion = clientX / innerWidth;
		const yProportion = clientY / innerHeight;

		angleBg = (xProportion + yProportion) * 720;
		mouseAngle = yProportion * 40 - 20;

		updateCombinedAngle();
		angle = angle % 360;

		document.documentElement.style.setProperty('--angle', `${angle}deg`);
		document.documentElement.style.setProperty('--angle-bg', `${angleBg}deg`);
	};

	const updateAngleOnScroll = () => {
		const { innerHeight } = window;

		const scrollY = window.scrollY;
		const scrollHeight = document.documentElement.scrollHeight;
		const scrollProportion = scrollY / (scrollHeight - innerHeight);

		/** @type {NodeListOf<HTMLElement>} elem */
		const elem = document.querySelectorAll('.container');
		elem.forEach((el) => {
			if (el.offsetParent !== null) {
				const rect = el.getBoundingClientRect();
				const cardHeight = rect.height;
				const cardPosition = (rect.top + cardHeight / 2) / innerHeight;

				angle = cardPosition * 80 - 40;
			}
		});

		angleBg = scrollProportion * 1800;

		angleBg = angleBg % 360;

		document.documentElement.style.setProperty('--angle-bg', `${angleBg}deg`);

		updateCombinedAngle();
	};

	const updateCombinedAngle = () => {
		/** @type {NodeListOf<HTMLElement>} elem */
		const elem = document.querySelectorAll('.container');
		elem.forEach((el) => {
			el.style.transform = `rotateX(${angle * 1.5 - mouseAngle}deg)`;
		});
	};

	////////////////////////////////////////////////////////////////////////

	onMount(() => {
		const intervalId = setInterval(() => getRandomNumber(hello), 1300);
		window.addEventListener('mousemove', updateAngle);
		if (document.documentElement.scrollHeight > window.innerHeight) {
			window.addEventListener('scroll', updateAngleOnScroll);
		}

		if (navigator.language.slice(0, 2) === 'pt') {
			lang = 'pt';
		}
		console.log(navigator.language);
		return () => {
			window.removeEventListener('mousemove', updateAngle);
			window.removeEventListener('scroll', updateAngleOnScroll);
			clearInterval(intervalId);
		};
	});
</script>

<div class="flex flex-col justify-center items-center h-[700px]">
	<p class="font-sans text-[5rem] text-white font-bold">
		{currentHello}, {#if lang === 'pt'}<span>sou</span>{:else}<span>I'm</span>{/if} Pedro Lodi.
	</p>
	{#if lang === 'pt'}
		<p class="font-sans text-lg text-white">Sou um Designer Gráfico e Web Developer de Curitiba.</p>
	{:else}
		<p class="font-sans text-lg text-white">
			I'm a Graphic Designer turned Web Developer from Brazil.
		</p>
	{/if}
</div>
<div class="flex p-16 justify-center lg:justify-between">
	<section class="preserve3d hidden lg:flex">
		<div class="container relative flex">
			<img class="bg-image" alt="" src={bg1} />
			<div class="subcontainer">
				<img class="top-image" alt="" src={top1} />
			</div>
		</div>
	</section>
	<section class="preserve3d">
		<div class="container relative flex">
			<img class="bg-image" alt="" src={bg2} />
			<div class="subcontainer">
				<img class="top-image" alt="" src={top2} />
			</div>
		</div>
	</section>
	<section class="preserve3d hidden lg:flex">
		<div class="container relative flex">
			<img class="bg-image" alt="" src={bg3} />
			<div class="subcontainer">
				<img class="top-image" alt="" src={top3} />
			</div>
		</div>
	</section>
</div>
<div class="flex justify-center items-center h-[600px] font-sans text-[5rem] text-white"></div>

<style>
	:root {
		--height: 500px;
	}
	* {
		box-sizing: border-box;
	}
	:global(body) {
		background: #2b2b35;
	}
	img {
		max-height: var(--height);
		border-radius: calc(var(--height) * 0.03);
	}
	.preserve3d {
		transform-style: preserve-3d;
		perspective: 70rem;
		width: fit-content;
		height: fit-content;
	}
	.container {
		filter: drop-shadow(0px 15px 15px);
		transform: rotateX(70deg);
	}
	.preserve3d:first-child {
		transform: rotateY(20deg);
	}
	.preserve3d:last-child {
		transform: rotateY(-20deg);
	}
	.subcontainer {
		position: absolute;
		left: 0;
	}
	.bg-image {
		filter: hue-rotate(var(--angle-bg));
	}
</style>
