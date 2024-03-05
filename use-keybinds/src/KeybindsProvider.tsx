import React, { createContext, useMemo } from "react";
import { createKeybindCombinationString } from "./utils";
import type { ReactNode } from "react";
import type { Keybind, Keybinds } from "./types";

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
      const combinationString = createKeybindCombinationString(
        keybind.keybind,
        keybind.isSequential
      );
      return { ...result, [combinationString]: key };
    }, {});
  }, [keybinds]);

  return (
    <KeybindsContext.Provider value={{ keybinds, combinationsToKeybindKey }}>
      {children}
    </KeybindsContext.Provider>
  );
};

export default KeybindsProvider;
