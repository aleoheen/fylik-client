<template lang="pug">
	
	#home
		h1(v-if="$store.state.language === 'ru'").
			Загруженные файлы

		h1(v-else).
			Uploaded files

		transition-group(name="file-list", appear, tag="div")#files
			file(v-for="file, index in files", :file="file", :key="file.uid", :index="index")

</template>

<style lang="less">
	@import "../assets/less/vars";
	@import "../assets/less/pages/home";
</style>

<script src="../assets/js/pages/home.js"></script>