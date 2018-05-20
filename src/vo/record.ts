import { Rank } from "./rank";
import Vo from "./vo";

export default class Record extends Vo {
	stageId: number;
	rank: Rank;
	time: number;
	userId: string;

	constructor(stageId, rank, time, userId) {
		super();
		this.stageId = stageId;
		this.rank = rank;
		this.time = time;
		this.userId = userId;
	}

	toJson() {
		return {
			stageId: this.stageId,
			rank: this.rank,
			time: this.time,
			userId: this.userId
		}
	}

	public static by(jsonString : string): Record {
		let json;
		let record = null;
		try {
			json = JSON.parse(jsonString);
			record = new Record(json.stageId, json.rank, json.time, json.userId);
		} catch (e) {
			// jsonString is not valid.
			// Just ignore this case.
		}

		return record;
	}
}