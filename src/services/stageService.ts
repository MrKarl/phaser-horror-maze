import { Service } from "./service";
import { Stage } from "../vo/stage";
import { Point } from "../vo/point";

export default class StageService implements Service {
	userId : string;
	stageMap : any;
	
	constructor() {
		this.stageMap = {};
		this.generateStageMap();
	}

	public initialize() {
		
	}

	public getStageInformation(userId : string) {

	}

	private generateStageMap() {
		for (let i=0; i<3; i++) {
			let zeroFormat = '000' + i;
			let mapSeq = zeroFormat.slice(-3);

			const floorPath = 'assets/img/maps/floor-' + mapSeq + '.png';
			const wallPath = 'assets/img/maps/walls-' + mapSeq + '.png';

			// const stage = new Stage(i, floorPath, wallPath, Point.on(235, 85));


			const stage = new Stage(i, floorPath, wallPath, 
				[
					Point.on(235, 85),
					Point.on(565, 400)
				]);
			
			this.stageMap[i] = stage;
		}
	}
}