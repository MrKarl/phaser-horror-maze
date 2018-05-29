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
			let userStr = userObj[userId];
			if (typeof userStr === 'string') {
				user = JSON.parse(userStr);
			} else {
				user = userStr;
			}
			
		} catch (e) {
			user = null;
		}
		
		return user;
	}

	public registerUser(user : User, callback: (user: User, isAlreadyExist: boolean) => void) {
		const userId = user.userId;
		const userInSession = this.userDao.select(this.USER_TABLE, userId);
		
		let isAlreadyExist = true;
		if (!userInSession) {
			this.userDao.insert(this.USER_TABLE, user);
			isAlreadyExist = false;
		}

		callback(user, isAlreadyExist);
	}

	public login(userId: string, callback: (user: User, isSuccess: boolean) => void) {
		const user = this.userDao.select(this.USER_TABLE, userId);
		if (user) {
			this.userDao.delete(this.TABLE_LAST_LOGGED_IN, userId);
			this.userDao.insert(this.TABLE_LAST_LOGGED_IN, user);
			callback(user, true);
		} else {
			callback(null, false);
		}
	}

	public logout(userId: string) {
		this.userDao.delete(this.TABLE_LAST_LOGGED_IN, userId);
	}
}