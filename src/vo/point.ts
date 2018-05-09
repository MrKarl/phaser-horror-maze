export class Point {
	x: number;
	y: number;
	active: boolean;

	constructor(x: number, y:number) {
		this.x = x;
		this.y = y;
		this.active = false;
	}

	public static on(x: number, y:number) {
		return new Point(x,y);
	}
}