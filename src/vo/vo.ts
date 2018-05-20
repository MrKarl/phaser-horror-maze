export default abstract class Vo {
	toString() {
		JSON.stringify(this.toJson());
	}

	abstract toJson() : any;
}