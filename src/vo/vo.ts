export default abstract class Vo {
	toString() {
		return JSON.stringify(this.toJson());
	}

	abstract toJson() : any;
}