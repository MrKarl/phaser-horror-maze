export class User {
	id : string;
	provider : string;
	score? : number;
	registeredDate? : number;

	constructor(id: string, provider: string, score?, registeredDate?) {
		this.id = id;
		this.provider = provider;
		this.score = score;
		this.registeredDate = registeredDate;
	}

	toJson() {
		return {
			id: this.id,
			provider: this.provider,
			score: this.score,
			registeredDate: this.registeredDate
		}
	}
}