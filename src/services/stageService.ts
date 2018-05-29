import { Service } from "./service";
import { Stage } from "../vo/stage";
import { Point } from "../vo/point";

export default class StageService implements Service {
	static NUM_OF_STAGE = 5;
	stageMap : any;
	
	constructor() {
		this.stageMap = {};
		this.generateStageMap();
	}

	public initialize() { }

	public getStageInformation() {
		return this.stageMap;
	}

	// Load Stage Map Information
	private generateStageMap() {
		for (let i=0; i<StageService.NUM_OF_STAGE; i++) {
			let zeroFormat = '000' + i;
			let mapSeq = zeroFormat.slice(-3);

			const floorPath = 'assets/img/maps/floor-' + mapSeq + '.png';
			const wallPath = 'assets/img/maps/walls-' + mapSeq + '.png';

			const stage = new Stage(i, floorPath, wallPath, 
				[
					Point.on(235, 85),
					Point.on(565, 400)
				]);
			
			this.stageMap[i] = stage;
		}
	}
}