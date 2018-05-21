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
		this.records[record.stageId] = record;
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

	public static by(jsonString : string): Record {
		let json;
		let record = null;
		try {
			json = JSON.parse(jsonString);
			record = new Record(json.userId, json.records);
		} catch (e) {
			// jsonString is not valid.
			// Just ignore this case.
		}

		return record;
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