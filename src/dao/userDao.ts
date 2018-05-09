import DAO from "./dao";
import User from "../vo/user";

export class UserDao extends DAO<User> {
	public insert(key: string, obj: User): User {
		this.session.set(key, obj.toString());

		return obj;
	}

	public select(key: string): User {
		const userStr = this.session.get(key);
		const user: User = User.by(userStr);
		return user;
	}

	public update(key: string, obj: User): User {
		this.session.set(obj.userId, obj.toString());
		
		return obj;
	}

	public delete(key: string): boolean {
		let isSuccess = true;
		try {
			this.session.remove(key);
		} catch {
			isSuccess = false;
		}

		return isSuccess;
	}

	public selectAll(): User[] {
		throw new Error('This is not supported');
	}
}