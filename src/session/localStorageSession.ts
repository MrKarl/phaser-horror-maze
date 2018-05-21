import Session from "./session";

export class LocalStorageSession implements Session {
	get(table: string, key: string) : any {
		const tableData = localStorage.getItem(table) || null;
		if (!tableData) {
			return null;
		}

		const tableJsonObj = JSON.parse(tableData);
		let item = tableJsonObj[key];

		return item;
	}

	set(table: string, key: string, value: any) { // value: string;
		const originalDataObj = this.get(table, key);
		if (!originalDataObj) {
			const obj = {};
			obj[key] =  value;

			const writtenData = JSON.stringify(obj);

			if (typeof value === 'string') {
				localStorage.setItem(table, value);	
			} else {
				localStorage.setItem(table, writtenData);
			}
		} else {
			let jsonValue = JSON.parse(value);
			jsonValue[key] = JSON.parse(jsonValue[key]);

			let temp = JSON.parse(originalDataObj);
			let originalDataJson = {};
			originalDataJson[key] = temp;

			const obj = Object.assign({}, originalDataObj, jsonValue);
			localStorage.setItem(table, obj);
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
}