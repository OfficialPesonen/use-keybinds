import type { KeybindCombination } from "./types";

export const createKeybindCombinationString = (combination: KeybindCombination, isSequential?: boolean) => {
  return (isSequential ? "isSequential-" : "") + combination.join("");
};
