<template lang="pug">
	
	#app

		//- === === === === ===
		//- Header
		//- === === === === ===

		header
			h1 {{lang.name}} <span>- {{lang.label}}</span>

			//- === === === === ===
			//- Header buttons
			//- === === === === ===

			#header-buttons
				button#header-buttons-upload(v-if="!progress", :disabled="remaining < 1", @click="$refs.fileUpload.click()")
					fa(:icon="['fas', 'upload']" fixed-width)
					span {{lang.header.buttons.upload}}

				input(type="file", name="file", ref="fileUpload", @change="upload")#header-buttons-file

				button#header-buttons-progress(v-if="progress",disabled)
					span {{lang.header.buttons.uploading}} {{progress | round}}%

				button#header-buttons-language.secondary(@click="$store.commit('switchLanguage')", :title="lang.header.buttons.language")
					fa(:icon="['fas', 'globe']" fixed-width)

			//- === === === === ===
			//- Header progress
			//- === === === === ===

			#header-progress(:style="{width: progress + '%'}")

		//- === === === === ===
		//- Main block
		//- === === === === ===

		main: transition(name="slide", mode="out-in", appear, after-enter="pageInit"): router-view

		//- === === === === ===
		//- Footer
		//- === === === === ===

		footer

			//- === === === === ===
			//- Footer navigation
			//- === === === === ===

			nav
				ul
					li(v-for="link, name in lang.footer.nav")
						router-link(:to="{name}") {{link}}

			//- === === === === ===
			//- Footer copyright
			//- === === === === ===

			#footer-copyright.
				{{lang.footer.author}}: <a href="https://aleoheen.org">Aleoheen</a>

</template>

<!-- === === === === === -->
<!-- Fonts -->
<!-- === === === === === -->

<style>
	@import "https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css";
	@import "https://cdn.aleoheen.org/fonts/Product_Sans/stylesheet.min.css";
</style>

<!-- === === === === === -->
<!-- Styles -->
<!-- === === === === === -->

<style 	lang="less">
	@import "./assets/less/main";
</style>

<!-- === === === === === -->
<!-- Scripts -->
<!-- === === === === === -->

<script src="./assets/js/app.js"></script>