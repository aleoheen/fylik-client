<template lang="pug">
	
	div(v-if="$store.state.language === 'ru'")
		include ../pages/ru/about.pug

	div(v-else)
		include ../pages/en/about.pug

</template>

<script src="../assets/js/pages/about.js"></script>