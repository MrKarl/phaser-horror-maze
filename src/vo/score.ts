import { Rank } from "./rank";
import Vo from "./vo";

export default class Score extends Vo {
	time : number;
	rank : Rank;
	
	constructor(time?: number, rank?: Rank) {
		super();

		this.time = time | 0;
		this.rank = rank | Rank.NONE;
	}

	toJson() {
		return {
			time: this.time,
			rank: this.rank,
		}
	}
	
}