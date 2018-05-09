import { Point } from "./point";
import { MapType } from "./mapType";
import { Rank } from "./rank";

export class Stage {
	stageId : number;
	floorFilePath : string;
	wallFilePath : string;

	exitPoints : Array<Point>;
	timeLimit : number;

	treasurePoints : Array<Point>;

	mapType: MapType;

	//TODO: ???
	sound : Phaser.Sound;

	constructor(stageId: number, floorFilePath: string, wallFilePath: string, exitPoints: Array<Point>, timeLimit=5000) {
		this.stageId = stageId;
		this.floorFilePath = floorFilePath;
		this.wallFilePath = wallFilePath;
		this.exitPoints = exitPoints;

		this.timeLimit = timeLimit;
	}
}