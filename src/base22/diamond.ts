import { NumberReducer, reduceNumberDigits, ReduceNumberDigitsAttrs } from "../utils";
import { Base22Profile } from "./base22";

export interface IDiamondProfileConstructor {
  day: number;
  month: number;
  year: number;
}

export class DiamondProfile extends Base22Profile {
  public readonly starFacet: number; // FE
  public readonly radiationSource: number; // FR
  public readonly reflect: number; // R
  public readonly keyResource: number; // RC

  public readonly diamondSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 30, 33, 40, 44],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.diamondSumOptions);

  constructor({ day, month, year }: IDiamondProfileConstructor) {
    super({ day, month, year });

    // Delegating the presentation of the reduced number to the frontend
    // so we're leaving potential numbers above 22
    const lastReducer = reduceNumberDigits({
      sumRecursively: false,
      stopNumbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    });

    this.starFacet = this.numberReducer(this.reducedDay + this.reducedMonth); // FE
    const reducedStarFacet = lastReducer(this.starFacet);

    const reducedDeepPersonality = lastReducer(this.deepPersonality); // PP

    this.radiationSource = this.numberReducer(reducedStarFacet + reducedDeepPersonality); // FR
    const reducedRadiationSource = lastReducer(this.radiationSource);

    this.reflect = this.numberReducer(this.year % 100); // R

    this.keyResource = this.numberReducer(
      reducedStarFacet + reducedRadiationSource + reducedDeepPersonality + this.reducedYear
    ); // RC
  }
}
