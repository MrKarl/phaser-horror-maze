import Score from "./score";
import Vo from "./vo";

export default class User extends Vo {
	userId : string;
	score : Score;
	registerDate : Date;
	lastVisitDate : Date;

	constructor(userId, score) {
		super();
		this.userId = userId;
		this.score = score;
		this.registerDate = new Date();
		this.lastVisitDate = new Date();
	}

	public static by(json : any): User {
		if (json == null) {
			return null;
		}
		const user: User = new User(json.userId, json.score);
		user.registerDate = json.registerDate;
		user.lastVisitDate = json.lastVisitDate;

		return user;
	}

	toJson() {
		return {
			userId: this.userId,
			score: this.score,
			registerDate: this.registerDate,
			lastVisitDate: this.lastVisitDate,
		};
	}
}