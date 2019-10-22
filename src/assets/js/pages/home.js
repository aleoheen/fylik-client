import fileC from '../../../components/file.vue';

export default {

	components: {
		file: fileC
	},

	computed: {
		files() {
			return this.$store.state.files
		},
		lang() {this.$store.state.lang}
	}

}