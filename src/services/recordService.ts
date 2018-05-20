import { Service } from "./service";
import DAO from "../dao/dao";
import Record from "../vo/record";
import { LocalStorageSession } from "../session/localStorageSession";
import { RecordDao } from "../dao/recordDao";
import Session from "../session/session";

export default class RercordService implements Service {
	recordDao : DAO<Record>;
	session : Session;

	constructor() {
		this.session = new LocalStorageSession();
		this.recordDao = new RecordDao(this.session);
	}

	initialize() {
		throw new Error("Method not implemented.");
	}

	getRecordsInfo(userId) {
		
 	}
}