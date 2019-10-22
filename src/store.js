import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		limits: {
			amount: 0,
			size: 0
		},
		files: [],
		language: 'ru',
		lang: require(`./json/lang/ru.json`)
	},
	mutations: {

		applyLimits(state, limits) {
			state.limits.amount = limits.max_files_amount;
			state.limits.size = limits.max_file_size
		},

		switchLanguage(state, lang) {

			if(!lang) lang = (state.language === 'ru' ? 'en' : 'ru');

			if(!['ru', 'en'].includes(lang)) lang = 'ru';

			state.language = lang;
			state.lang = require(`./json/lang/${lang}.json`);

			localStorage.setItem('language', lang);

		}

	},
	actions: {

	}
})
