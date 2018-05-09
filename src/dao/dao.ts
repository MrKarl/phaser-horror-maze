import Session from "../session/session";

export default abstract class DAO<T> {
	session: Session;
	constructor(session: Session) {
		this.session = session;
	}

	public abstract insert(key: string, obj: T): T;
	public abstract select(key: string): T;
	public abstract update(key: string, obj: T): T;
	public abstract delete(key: string): boolean;
	public abstract selectAll(): Array<T>;
}