import Util from "../util/util";
import User from "../vo/user";
import { Service } from "./service";
import DAO from "../dao/dao";
import { UserDao } from "../dao/userDao";
import { LocalStorageSession } from "../session/localStorageSession";
import Session from "../session/session";

export default class AuthService implements Service {
	userDao : DAO<User>;
	session : Session;

	private readonly TABLE_LAST_LOGGED_IN = 'lastLoggedInUser';
	private readonly USER_TABLE = 'mazeUserRepo';

	constructor() {
		this.session = new LocalStorageSession();
		this.userDao = new UserDao(this.session);
	}
	
	public initialize() {
		
	}

	public getLastLoggedInUser() : User {
		const obj = this.userDao.selectAll(this.TABLE_LAST_LOGGED_IN);
		let userObj;
		let user;
		try {
			userObj = JSON.parse(obj);
			const userId = Object.keys(userObj)[0];
			user = userObj[userId];
			user = JSON.parse(user);
		} catch (e) {
			user = null;
		}
		
		return user;
	}

	public registerUser(user : User) {
		this.userDao.insert(this.USER_TABLE, user);
		this.userDao.insert(this.TABLE_LAST_LOGGED_IN, user);
	}

	public login(userId: string, callback: (user: User, isSuccess: boolean) => void) {
		const user = this.userDao.select(this.USER_TABLE, userId);
		if (user) {
			callback(user, true);
		} else {
			callback(null, false);
		}
	}

	public logout(userId) {
		//TODO: implements it.

		const user = this.userDao.select(this.USER_TABLE, userId);
		
		console.log('next user would be removed.');
		console.log(user);
		this.userDao.delete(this.USER_TABLE, userId);
	}
}