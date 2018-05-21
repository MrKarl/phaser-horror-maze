import DAO from "./dao";
import User from "../vo/user";

export class UserDao extends DAO<User> {
	private readonly userKey = 'mazeUserRepo';
	
	public insert(table: string, obj: User): User {
		// const userDatabase = {};
		// userDatabase[obj.userId] = obj.toString();
		debugger;
		this.session.set(table, obj.userId, obj.toString());

		return obj;
	}

	public select(table: string, userId: string): User {
		const userStr = this.session.get(table, userId);

		const user: User = User.by(userStr);
		return user;
	}

	public update(table: string,userId: string, obj: User): User {
		this.session.set(table, userId, obj.toString());
		
		return obj;
	}

	public delete(table: string, userId: string): boolean {
		let isSuccess = true;
		try {
			this.session.remove(table, userId);
		} catch {
			isSuccess = false;
		}

		return isSuccess;
	}

	public selectAll(table: string): any {
		const objs = (<any>this).session.allStorage();
		const obj = objs[table];

		return obj;
	}
}