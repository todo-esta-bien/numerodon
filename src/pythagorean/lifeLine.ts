import { reduceNumberDigits } from "../utils/utils";

export const karmicTask = (birthdayDay: number) =>
  reduceNumberDigits(birthdayDay, { sumRecursively: true });
