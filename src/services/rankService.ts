import { Service } from "./service";
import DAO from "../dao/dao";
import { Rank } from "../vo/rank";

export default class RankService implements Service {
	rankInfo: any;
	rankDAO : DAO<Rank>;

	public initialize() {
		
	}

	public calculateRank(stageId: number, elapsedTime: number) : Rank {
		const rankMetrix = {
			0: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			},
			1: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			},
			2: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			},
			3: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			},
			4: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			},
			5: {
				10: Rank.S,
				15: Rank.A,
				20: Rank.B,
				25: Rank.C,
				30: Rank.D,
				35: Rank.E,
			}
		};

		const stageRankMetrix = rankMetrix[stageId];
		for (let key in stageRankMetrix) {
			const timeLimit = parseInt(key);
			if (timeLimit > elapsedTime) {
				return stageRankMetrix[key];
			}
		}

		return Rank.F;
	}

	loadRankInformation() {

	}
}