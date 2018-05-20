import { Service } from "./service";
import DAO from "../dao/dao";
import { Rank } from "../vo/rank";

export default class RankService implements Service {
	rankInfo: any;

	rankDAO : DAO<Rank>;

	public initialize() {
		
	}

	loadRankInformation() {

	}
}