import Session from "./session";

export class CookieSession implements Session {
	get(key: string) {
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
	
	set(key: string, value: any, expiredTimeInHour: number) {
		const d = new Date();
		d.setTime(d.getTime() + (expiredTimeInHour*60*60*1000));
		
		const expires = 'expires=' + d.toUTCString();
		document.cookie = key + '=' + value + ';' + expires + ';path=/';
	}

	remove(key: string) {
		this.set(key, '', 0);
	}
}