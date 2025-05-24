import React, { createContext, useMemo } from "react";
import { createKeybindCombinationString } from "./utils";
import type { ReactNode } from "react";
import type { Keybind, KeybindCombination, Keybinds } from "./types";

export const KeybindsContext = createContext<{
  keybinds: Keybinds<string>;
  combinationsToKeybindKey: Record<string, string>;
}>({
  keybinds: {},
  combinationsToKeybindKey: {},
});

interface KeybindsProviderProps<Slug extends string> {
  children: ReactNode;
  keybinds: Keybinds<Slug>;
}

const KeybindsProvider = <Slug extends string>(props: KeybindsProviderProps<Slug>) => {
  const { children, keybinds = {} } = props;

  const combinationsToKeybindKey = useMemo<Record<string, Slug>>(() => {
    return Object.entries(keybinds).reduce((result, entry) => {
      const key = entry[0] as string;
      const keybind: Keybind = entry[1] as Keybind;

      const combinations: KeybindCombination[] = Array.isArray(keybind.keybind[0])
        ? (keybind.keybind as KeybindCombination[])
        : [keybind.keybind as KeybindCombination];

      const combinationStrings = combinations.reduce((result, combination) => {
        const combinationString = createKeybindCombinationString(
          combination,
          keybind.isSequential,
        );
        return { ...result, [combinationString]: key };
      }, {});

      return { ...result, ...combinationStrings };
    }, {});
  }, [keybinds]);

  return (
    <KeybindsContext.Provider value={{ keybinds, combinationsToKeybindKey }}>
      {children}
    </KeybindsContext.Provider>
  );
};

export default KeybindsProvider;
