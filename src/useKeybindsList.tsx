import { useContext } from "react";
import { KeybindsContext } from "./KeybindsProvider";

const useKeybindsList = <Slug extends string>() => {
  const { keybinds } = useContext(KeybindsContext);

  const getKeybind = (slug: Slug) => keybinds[slug];

  return {
    getKeybind,
    keybinds,
  };
};

export default useKeybindsList;
