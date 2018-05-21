import { Rank } from "./rank";
import Vo from "./vo";

export default class Record extends Vo {
	userId: string;
	records: any;

	constructor(userId, records) {
		super();
		this.userId = userId;
		this.records = records;
	}

	put(record: StageRecord) {
		this.records[record.stageId] = {
			stageId: record.stageId,
			rank: record.rank,
			time: record.time
		}
		// this.records[record.stageId] = record;
	}

	toJson() {
		let records = {};

		for (let p in this.records) {
			records[p] = this.records[p].toJson();
		}

		return {
			userId: this.userId,
			records: records
		}
	}

	public static by(json : any): Record {
		if (json == null) {
			return null;
		}
		const user: Record = new Record(json.userId, json.records);
		return user;
	}
}

export class StageRecord extends Vo {
	stageId: number;
	rank: Rank;
	time: number;

	constructor(stageId, rank: Rank, time) {
		super();
		this.stageId = stageId;
		this.rank = rank;
		this.time = time;
	}

	toJson() {
		return {
			stageId: this.stageId,
			rank: this.rank,
			time: this.time
		}
	}
}