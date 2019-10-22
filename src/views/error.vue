<template lang="pug">
	
	div(v-if="$store.state.language === 'ru'")
		include ../pages/ru/error.pug

	div(v-else)
		include ../pages/en/error.pug

</template>

<script src="../assets/js/pages/error.js"></script>