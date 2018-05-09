import Util from "../util/util";
import User from "../vo/user";
import { Service } from "./service";
import DAO from "../dao/dao";
import { UserDao } from "../dao/userDao";
import { LocalStorageSession } from "../session/localStorageSession";

export default class AuthService implements Service {
	private readonly userStorageKey = 'mazeInfo';
	
	userDao : DAO<User>;

	constructor() {
		// Use LocalStorageSession for saving userData
		const session = new LocalStorageSession();
		this.userDao = new UserDao(session);
	}
	
	public initialize() {
		
	}

	public login(callback: (user: User, isSuccess: boolean) => void) {
		const user = this.userDao.select(this.userStorageKey);
		if (user) {
			callback(user, true);
		} else {
			callback(null, false);
		}
	}

	public registerUser(user : User) {
		this.userDao.insert(this.userStorageKey, user);
	}

	public logout() {
		//TODO: implements it.

		const user = this.userDao.select(this.userStorageKey);
		console.log('next user would be removed.');
		console.log(user);

		this.userDao.delete(this.userStorageKey);
	}
}