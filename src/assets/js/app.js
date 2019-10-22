import axios from 'axios';

import funcs from '../../funcs';

export default {

	data() {
		return {
			progress: 0,
			nextWindow: +localStorage.getItem('nextWindow') || null,
			remaining: 0
		}
	},

	computed: {
		isOnline() {return navigator.onLine || false},
		lang() {return this.$store.state.lang}
	},

	mounted() {
		funcs.pageInit.call(this);
	},

	filters: {
		round: (digit) => funcs.round(digit, 0)
	},

	watch: {
		remaining(newvalue) {
			localStorage.setItem('remaining', newvalue);
		},
		nextWindow(newvalue) {
			localStorage.setItem('nextWindow', newvalue);
		}
	},

	methods: {
		pageInit() {return funcs.pageInit.call(this)},

		/* === === === === === */
		/* FILE UPLOAD!!!
		/* === === === === === */

		upload(e) {
			let file = e.target.files[0];

			/* === === === === === */
			/* Check file size
			/* === === === === === */

			if(file.size > this.$store.state.limits.size * Math.pow(1024, 2)) {
				return alert('Your file is too large. Try smaller');
			}

			/* === === === === === */
			/* Upload file
			/* === === === === === */

			let formData = new FormData();

			formData.append('file', file);

			axios
				.post(`${process.env.VUE_APP_API_URL}/upload`, formData, {
						onUploadProgress: (e) => {
							this.progress = e.loaded / e.total * 100
						}
					}
				).then(({headers}) => {

					/* === === === === === */
					/* Done
					/* === === === === === */

					this.progress = 0;
					
					/* === === === === === */
					/* Check upload limits
					/* === === === === === */

					let maxUploads = +headers['x-ratelimit-limit'];
					let remaining = +headers['x-ratelimit-remaining'];
					let nextWindow = +headers['x-ratelimit-reset'] * 1000;

					this.remaining = remaining;
					this.nextWindow = nextWindow;

				})
			.catch(error => funcs.ajaxErr(error));
		}
	},

	created() {

		/* === === === === === */
		/* Load limits from server
		/* === === === === === */

		axios
			.get(`${process.env.VUE_APP_API_URL}/limits`)
			.then(({data: limits}) => {
				this.$store.commit('applyLimits', limits);
				this.remaining = +localStorage.getItem('remaining') || limits.max_files_amount
			})
		.catch(error => funcs.ajaxErr(error));

		/* === === === === === */
		/* Fetch files
		/* === === === === === */

		let fetchFiles = async () => {

			let {data: {files: files}, data: {total: total}} = await axios.get(`${process.env.VUE_APP_API_URL}/list?offset=${0}`);

			files.forEach(file => this.$store.state.files.push(file));

			if(this.$store.state.files.length < total) fetchFiles();
		}

		fetchFiles().catch(error => funcs.ajaxErr(error));

		/* === === === === === */
		/* Subscribe for file list updates
		/* === === === === === */

		let updateFiles = () => {
			
			axios
				.get(`${process.env.VUE_APP_API_URL}/last`)
				.then(({data: {files}}) => {
					
					fetched: for(let file of files) {
						for(let _file of this.$store.state.files) {
							if(file.uid === _file.uid) continue fetched;
						}
						this.$store.state.files.push(file);
					}

					updateFiles();
				})
			.catch(error => funcs.ajaxErr(error));

		}

		updateFiles();

		/* === === === === === */
		/* Update remaining file uploads
		/* === === === === === */

		setInterval(() => {

			if(!this.nextWindow) return
			
			if(Date.now() >= this.nextWindow) {
				if(this.remaining < this.$store.state.limits.amount) this.remaining++;
				this.nextWindow = null
			}

		}, 1000);

		/* === === === === === */
		/* Set language
		/* === === === === === */

		let lang = localStorage.getItem('language') || navigator.language.substr(0, 2);

		this.$store.commit('switchLanguage', lang);

	}

}