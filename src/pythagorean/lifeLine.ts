import { reduceNumberDigits } from "../utils";

export const karmicTask = (birthdayDay: number) =>
  reduceNumberDigits(birthdayDay, { sumRecursively: true });
