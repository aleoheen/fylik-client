<template lang="pug">
	
	#contacts(v-if="$store.state.language === 'ru'")
		h1 Контакты
		p.
			Проект Fylik создан Александром Алёхиным.

		p: a(href="https://aleoheen.org") aleoheen.org

	#contacts(v-else)
		h1 Contacts
		p.
			Alexander Aleoheen is creator of Fylik Project.

		p: a(href="https://aleoheen.org") aleoheen.org

</template>