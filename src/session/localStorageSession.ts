import Session from "./session";

export class LocalStorageSession implements Session {
	get(key: string) {
		return localStorage.getItem(key) || '';
	}

	set(key: string, value: any) {
		let jsonStr;
		if (typeof value == 'string') {
			jsonStr = value;
		} else {
			jsonStr = JSON.stringify(value);
		}
		
		localStorage.setItem(key, jsonStr);
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}
}