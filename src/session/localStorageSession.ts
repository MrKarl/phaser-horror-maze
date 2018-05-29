import Session from "./session";

export class LocalStorageSession implements Session {
	get(table: string, key: string) : any {
		const tableData = localStorage.getItem(table) || null;
		if (!tableData) {
			return null;
		}

		const tableJsonObj = JSON.parse(tableData);
		let item = tableJsonObj[key];
		if (typeof item === 'object') {
			return item;
		}

		if (typeof item === 'string') {
			let obj = JSON.parse(item);	
			return obj;
		}		
		return item;
	}

	set(table: string, key: string, value: string) {
		const originalDataObj = this.get(table, key);
		if (!originalDataObj) {
			let data = {};
			data[key] = value;
			localStorage.setItem(table, JSON.stringify(data));
		} else {
			let jsonValue = JSON.parse(value);
			let data = {};
			data[key] = jsonValue;

			let data2 = {};
			data2[key] = originalDataObj;
			
			const obj = this.extend(data2, data);
			localStorage.setItem(table, JSON.stringify(obj));
		}
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	allStorage() {
		let archive = {};
		let keys = Object.keys(localStorage);
		let i = keys.length;

		while (i--) {
			archive[keys[i]] = localStorage.getItem(keys[i]);
		}

		return archive;
	}


	private extend(...args) {
		let o, i, k;
		for (o = {}, i = 0; i < arguments.length; i++) {
			// if (arguments[i].constructor !== Object) continue;
			for (k in arguments[i]) {
				if (arguments[i].hasOwnProperty(k)) {
					o[k] = arguments[i][k].constructor === Object ? this.extend(o[k] || {}, arguments[i][k]) : arguments[i][k];
				}
			}
		}
		return o;
	}
}