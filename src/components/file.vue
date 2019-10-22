<template lang="pug">
	.file(@click="openFile")
		.file-icon
			svg(:style="{fill: type.color}")
				use(:xlink:href="require('../assets/images/icons/files.svg') + '#' + type.type")

		.file-name {{file.name}}
		.file-size {{file.size | toPrettySize}}

		.file-term(:style="{background: type.color, width: `${term}%`}")

</template>

<script>
	import funcs from '../funcs';

	export default {
		props: {
			file: {
				type: Object,
				required: true
			},
			index: {
				type: Number,
				required: true
			}
		},

		data() {
			return {
				term: 100
			}
		},

		methods: {
			openFile() {
				window.open(this.file.link);
			}
		},

		computed: {
			type() {

				if(this.file.type.includes('image')) {
					return {
						type: 'image',
						color: '#4CAF50'
					};
				}

				if(this.file.type.includes('msword') || this.file.type.includes('office')) {
					return {
						type: 'document',
						color: '#1976D2'
					};
				}

				if(this.file.type.includes('pdf')) {
					return {
						type: 'pdf',
						color: '#C62828'
					};
				}

				if(this.file.type.includes('audio')) {
					return {
						type: 'audio',
						color: '#F44336'
					};
				}

				if(this.file.type.includes('video')) {
					return {
						type: 'video',
						color: '#7B1FA2'
					};
				}

				if(this.file.type.includes('source') || this.file.type.includes('text/css') || this.file.type.includes('text/html')) {
					return {
						type: 'source',
						color: '#263238'
					};
				}

				if(this.file.type.includes('zip') || this.file.type.includes('rar') || this.file.type.includes('tar')) {
					return {
						type: 'archive',
						color: '#673AB7'
					};
				}

				return {
					type: 'file',
					color: '#444444'
				};

			}
		},

		created() {

			let handleFile = () => {

				/* === === === === === */
				/* Run self distract timer
				/* === === === === === */

				let _100 = +this.file.expires;
				let _x = Date.now();
				let _0 = +this.file.timestamp;

				let n100 = _100 - _0;
				let nx = _x - _0;

				this.term = 100 - nx / n100 * 100;

				/* === === === === === */
				/* Remove file after it`s` term
				/* === === === === === */

				if(this.term <= 0) {
					clearInterval(int1);
					this.$store.state.files.splice(this.index, 1);
				}

			}

			let int1 = setInterval(handleFile, 1000);
			handleFile();

		},

		filters: {
			toPrettySize: funcs.toPrettySize
		}
	}
</script>