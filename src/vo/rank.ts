export enum Rank {
	NONE = 0,
	S = 1,
	A = 2,
	B = 3,
	C = 4,
	D = 5,
	E = 6,
	F = 7
}


export class RankUtil {
	static valueOf(rank: Rank): string {
		let ret = '';

		switch(rank) {
			case Rank.NONE: {
				break;
			}
			case Rank.S: {
				ret = 'S';
				break;
			}
			case Rank.A: {
				ret = 'A';
				break;
			}
			case Rank.B: {
				ret = 'B';
				break;
			}
			case Rank.C: {
				ret = 'C';
				break;
			}
			case Rank.D: {
				ret = 'D';
				break;
			}
			case Rank.E: {
				ret = 'E';
				break;
			}
			case Rank.F: {
				ret = 'F';
				break;
			}
			default: {
				ret = '';
			}
		}

		return ret;
	}
}