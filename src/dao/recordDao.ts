import DAO from "./dao";
import Record from "../vo/record";

export class RecordDao extends DAO<Record> {
	private readonly recordKey = 'mazeRecordInfo';

	public insert(table: string, obj: Record): Record {
		const recordDatabase = {};
		recordDatabase[obj.userId] = obj.toString();
		this.session.set(table, obj.userId, JSON.stringify(recordDatabase));

		return obj;
	}

	public select(table: string, userId: string): Record {
		const recordData = this.session.get(table, userId);

		const record: Record = Record.by(recordData);
		return record;
	}

	public update(table: string, userId: string, obj: Record): Record {
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