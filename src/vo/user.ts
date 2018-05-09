import Score from "./score";

export default class User {
	userId : string;
	score : Score;
	registerDate : Date;
	lastVisitDate : Date;

	constructor(userId, score) {
		this.userId = userId;
		this.score = score;
		this.registerDate = new Date();
		this.lastVisitDate = new Date();
	}

	public static by(jsonString : string): User {
		let json;
		let user = null;
		try {
			json = JSON.parse(jsonString);
			user = new User(json.userId, json.score);
			user.registerDate = json.registerDate;
			user.lastVisitDate = json.lastVisitDate;
		} catch (e) {
			// jsonString is not valid.
			// Just ignore this case.
		}

		return user;
	}

	public toString() {
		return JSON.stringify(this.toJson());
	}

	public toJson() {
		return {
			userId: this.userId,
			score: this.score.toString,
			registerDate: this.registerDate.toString(),
			lastVisitDate: this.lastVisitDate.toString(),
		};
	}
}