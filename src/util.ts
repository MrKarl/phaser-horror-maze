export class Util {
	static getCookie(key: string) : string {
		const name = key + '=';
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	static setCookie(key: string, value: string, expiredTimeInHour: number) {
		const d = new Date();
		d.setTime(d.getTime() + (expiredTimeInHour*60*60*1000));
		
		const expires = 'expires=' + d.toUTCString();
		document.cookie = key + '=' + value + ';' + expires + ';path=/';
	}

	static getLocalStorageValue(key: string) : string {
		return localStorage.getItem(key) || '';
	}

	static setLocalStorageValue(key: string, value: any) {
		let jsonStr;
		if (typeof value == 'string') {
			jsonStr = value;
		} else {
			jsonStr = JSON.stringify(value);
		}
		
		localStorage.setItem(key, jsonStr);
	}

	static generateUUID() : string {
		let s4 = () => ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
		
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
}
