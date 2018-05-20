import DAO from "./dao";
import Record from "../vo/record";

export class RecordDao extends DAO<Record> {
	private readonly recordKey = 'mazeRecordInfo';

	public insert(table: string, obj: Record): Record {
		const recordDatabase = {};
		recordDatabase[obj.userId] = obj.toString();
		this.session.set(this.recordKey, obj.userId, JSON.stringify(recordDatabase));

		return obj;
	}

	public select(table: string, userId: string): Record {
		const allRecordData = this.session.get(this.recordKey, userId);
		
		const record: Record = Record.by(allRecordData);
		return record;
	}

	public update(table: string, userId: string, obj: Record): Record {
		this.session.set(this.recordKey, userId, obj.toString());
		
		return obj;
	}

	public delete(table: string, userId: string): boolean {
		let isSuccess = true;
		try {
			this.session.remove(this.recordKey, userId);
		} catch {
			isSuccess = false;
		}

		return isSuccess;
	}

	public selectAll(table: string): Record[] {
		throw new Error('This is not supported');
	}
}