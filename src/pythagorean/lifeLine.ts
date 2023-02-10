import { reduceNumberDigits } from "src/utils/utils";

export const karmicTask = (birthdayDay: number) =>
  reduceNumberDigits(birthdayDay, { sumRecursively: true });
