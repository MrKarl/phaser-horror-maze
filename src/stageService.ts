class Stage {
	stageId : number;
	floorFilePath : string;
	wallFilePath : string;

	constructor(stageId: number, floorFilePath: string, wallFilePath: string) {
		this.stageId = stageId;
		this.floorFilePath = floorFilePath;
		this.wallFilePath = wallFilePath;
	}
}

export class StageService {
	private static readonly instance = new StageService();

	userId : string;

	stageMap : any;
	
	constructor() {
		this.stageMap = {};
		this.generateStageMap();
	}

	public static getInstance() {
		return StageService.instance;
	}

	public getStageInformation(userId : string) {

	}

	private generateStageMap() {
		for (let i=0; i<3; i++) {
			let zeroFormat = '000' + i;
			let mapSeq = zeroFormat.slice(-3);

			const floorPath = 'assets/img/floor-' + mapSeq + '.png';
			const wallPath = 'assets/img/walls-' + mapSeq + '.png';

			const stage = new Stage(i, floorPath, wallPath);
			this.stageMap[i] = stage;
		}
	}
}

class Score {
	time : number;
	rank : Rank;
	
	constructor(time: number, rank: Rank) {
		this.time = time | 0;
		this.rank = rank | Rank.NONE;
	}
}

enum Rank {
	NONE = 0,
	S = 1,
	A = 2,
	B = 3,
	C = 4,
	D = 5,
	E = 6,
	F = 7
}


