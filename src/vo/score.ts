import { Rank } from "./rank";

export default class Score {
	time : number;
	rank : Rank;
	
	constructor(time?: number, rank?: Rank) {
		this.time = time | 0;
		this.rank = rank | Rank.NONE;
	}

	public toString() {
		return JSON.stringify({
			time: this.time,
			rank: this.rank
		});
	}
}