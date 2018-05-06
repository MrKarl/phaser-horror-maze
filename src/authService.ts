import { Util } from "./util";

export class AuthService {
	private static readonly instance = new AuthService();

	constructor() {

	}
	
	public static getInstance() {
		return AuthService.instance;
	}

	login(callback) {
		const uuid = Util.getLocalStorageValue('uuid');
			
		if (uuid) {
			callback(true);
		} else {
			callback(false);
		}

	}

	logout() {

	}

	


}