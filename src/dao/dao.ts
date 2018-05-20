import Session from "../session/session";

export default abstract class DAO<T> {
	session: Session;
	constructor(session: Session) {
		this.session = session;
	}

	public abstract insert(table: string, obj: T): T;
	public abstract select(table: string, key: string): T;
	public abstract update(table: string, key: string, obj: T): T;
	public abstract delete(table: string, key: string): boolean;
	public abstract selectAll(table: string): any;//Array<T>;
}