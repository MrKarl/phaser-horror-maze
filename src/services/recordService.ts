import { Service } from "./service";
import DAO from "../dao/dao";
import Record from "../vo/record";
import { LocalStorageSession } from "../session/localStorageSession";
import { RecordDao } from "../dao/recordDao";
import Session from "../session/session";

export default class RecordService implements Service {
	recordDao : DAO<Record>;
	session : Session;

	private readonly RECORD_TABLE = 'mazeRecordRepo';

	constructor() {
		this.session = new LocalStorageSession();
		this.recordDao = new RecordDao(this.session);
	}

	initialize() {
		throw new Error("Method not implemented.");
	}

	public getRecord(userId: string): Record {
		const record = this.recordDao.select(this.RECORD_TABLE, userId);
		return record;
	}

	public setRecord(record: Record) {
		this.recordDao.insert(this.RECORD_TABLE, record);
	}

	
}