import consola from 'consola'

let round = (digit, places = 2) => {
	return Math.round(digit * Math.pow(10, places)) / Math.pow(10, places)
}

/* === === === === === */
/* Regular functions
/* === === === === === */

export default {

	consola, round,

	rand(min = 0, max = 0) {
		return Math.round(Math.random() * (max - min) + min);
	},

	err(code, message) {
		if(location.href.includes('/error')) return false;

		location.href = `${process.env.BASE_URL}error?code=${code}&message=${message}`;
	},

	ajaxErr({response, message}) {
		this.err(response ? response.status === 404 ? 0 : response.status : 0, response ? response.data.details : message)
	},

	toPrettySize(bytes) {

		let _gb = Math.pow(1024, 3);
		if(bytes > _gb) {
			return `${round(bytes / _gb)} G`
		}

		let _mb = Math.pow(1024, 2);
		if(bytes > _mb) {
			return `${round(bytes / _mb)} MB`
		}

		let _kb = 1024;
		if(bytes > _kb) {
			return `${round(bytes / _kb)} KB`
		}

		return `${bytes} B`

	},

	pageInit() {

		/* === === === === === */
		/* Open extended links in new tab
		/* === === === === === */

		for(let a of document.querySelectorAll('a[href^="http"]')) {
			a.target = "_blank";
		}

		/* === === === === === */
		/* Disable draggation from images
		/* === === === === === */

		for(let img of document.querySelectorAll('img')) {
			img.draggable = false;
		}

	},

}