<script>
	import { onMount } from 'svelte';

	/** @type {string} */
	let lang;
	/** @type {boolean} */
	let langAuto = true;

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

	/** @type {HTMLElement|null} wrapper */
	let wrapper = null;

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
		if (!wrapper) return;

		const { clientHeight, scrollHeight, scrollTop } = wrapper;

		const scrollProportion = scrollTop / (scrollHeight - clientHeight);

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
	function changeLang() {
		langAuto = false;
		lang === 'pt' ? (lang = 'en') : (lang = 'pt');
	}

	////////////////////////////////////////////////////////////////////////

	onMount(() => {
		wrapper = document.querySelector('.wrapper');
		if (!wrapper) return;

		const intervalId = setInterval(() => getRandomNumber(hello), 1300);
		window.addEventListener('mousemove', updateAngle);
		wrapper.addEventListener('scroll', updateAngleOnScroll);

		if (langAuto) {
			if (navigator.language.slice(0, 2) === 'pt') {
				lang = 'pt';
			}
		}

		return () => {
			window.removeEventListener('mousemove', updateAngle);
			if (wrapper) {
				wrapper.removeEventListener('scroll', updateAngleOnScroll);
			}
			clearInterval(intervalId);
		};
	});
</script>

<div class="fixed text-sm flex gap-8 px-8 w-full bg-gradient-to-b from-black h-32 z-50">
	<button
		on:click={changeLang}
		class={lang === 'pt'
			? 'text-white my-8 flex h-fit'
			: 'text-white my-8 flex h-fit opacity-20 hover:opacity-100'}>português</button
	>
	<button
		class={lang === 'pt'
			? 'text-white my-8 flex h-fit opacity-20 hover:opacity-100'
			: 'text-white my-8 flex h-fit'}
		on:click={changeLang}>english</button
	>
</div>

<div class="wrapper">
	<div
		class="flex flex-col relative preserve3dtitle justify-center items-start mx-[32%] text-left h-[600px] mb-[10rem]"
	>
		<div
			class="z-[-1] top-[-5rem] bg-black blur-[100px] rounded-full absolute lg:h-[40rem] h-[20rem] w-[10rem] lg:w-[40rem] theblob"
		></div>
		<p class="hero-card text-[2.5rem] lg:text-[5rem] text-white font-bold tracking-tighter">
			{currentHello},
		</p>
		<p
			class="hero-card text-[2.5rem] lg:text-[5rem] text-white font-bold tracking-tighter leading-tight"
		>
			{#if lang === 'pt'}
				<span>sou</span>
			{:else}
				<span>I'm</span>
			{/if} Pedro Lodi.
		</p>
		{#if lang === 'pt'}
			<p class="hero-card text-lg text-white mt-8">
				Designer Gráfico e Desenvolvedor Front-end de Curitiba.
			</p>
		{:else}
			<p class="hero-card text-lg text-white mt-8">
				Graphic Designer turned Front-end Developer from Brazil.
			</p>
		{/if}
	</div>

	<div class="flex flex-wrap preserve3dtitle justify-center bg-[size:95%] lg:bg-[size:35%] mussiol">
		<section class="flex justify-center w-fit p-10 translateclass">
			<p class="text-white hero-card text-xl lg:text-3xl font-bold">1. Design Gráfico</p>
		</section>
		<div class="flex justify-center w-full lg:justify-between mb-10 px-32">
			<section class="perspective w-fit h-fit hidden lg:flex">
				<div class="container relative flex">
					<img class="bg-image" alt="" src="bg2.png" />
					<div class="subcontainer">
						<img class="top-image" alt="" src="top2.png" />
					</div>
				</div>
			</section>
			<section class="perspective w-fit h-fit">
				<div class="container relative flex">
					<img class="bg-image" alt="" src="bg1.png" />
					<div class="subcontainer">
						<img class="top-image" alt="" src="top1.png" />
					</div>
				</div>
			</section>
			<section class="perspective w-fit h-fit hidden lg:flex">
				<div class="container relative flex">
					<img class="bg-image" alt="" src="bg3.png" />
					<div class="subcontainer">
						<img class="top-image" alt="" src="top3.png" />
					</div>
				</div>
			</section>
		</div>
		<section class="flex justify-center pb-10">
			<p class="text-white text-lg">
				<!-- {#if lang === 'pt'} -->
				<!-- 	Mussiol Atelier foi um projeto de branding de moda. -->
				<!-- {:else} -->
				<!-- 	Mussiol Atelier was something english -->
				<!-- {/if} -->
			</p>
		</section>
	</div>

	<div class="flex flex-col justify-center preserve3dtitle gap-10 items-center h-[800px] mt-20">
		<div class="translateclass">
			<p class="hero-card text-white lg:text-3xl text-xl">2. Fotografia</p>
		</div>
		<div class="perspective flex">
			<img
				class="rotate40 photoshadow"
				src="photo8.jpg"
				alt="photograph looking at the night sky from inside an abandoned factory"
			/>
			<img class="rotate30 photoshadow" src="photo8.jpg" alt="" />
			<img class="photoshadow -translate-x-96" src="photo8.jpg" alt="" />
		</div>
	</div>
</div>

<style>
	:root {
		--height: 500px;
	}
	* {
		box-sizing: border-box;
	}
	:global(body) {
		background: #050505;
		font-family: 'JetBrains Mono';
	}
	img {
		max-height: var(--height);
		border-radius: calc(var(--height) * 0.03);
	}
	.preserve3dtitle {
		transform-style: preserve-3d;
	}
	.container {
		filter: drop-shadow(0px 15px 15px);
		transform: rotateX(70deg);
	}
	.photoshadow {
		filter: drop-shadow(0px 15px 15px);
	}
	.subcontainer {
		position: absolute;
		left: 0;
	}
	.bg-image {
		filter: hue-rotate(var(--angle-bg));
	}
	.hero-card {
		font-family: 'JetBrains Mono';
		text-shadow: 0px 5px 10px black;
	}
	.wrapper {
		height: 100vh;
		perspective: 60rem;
		overflow-y: auto;
	}
	.translateclass {
		transform: translateZ(300px);
	}
	.mussiol {
		background-image: url(../lib/assets/testwhite.png);
	}
	.rotate30 {
		transform: rotateY(40deg) translateX(-150px) scale(0.7);
	}
	.rotate40 {
		transform: rotateY(70deg) translateX(150px) scale(0.7);
	}
</style>
