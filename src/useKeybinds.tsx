import { useContext, useEffect } from "react";
import useFocusedElement from "./helpers/useFocusedElement";
import { KeybindsContext } from "./KeybindsProvider";
import type { KeybindCallbacks, KeyboardEventKeycode } from "./types";
import { createKeybindCombinationString } from "./utils";

const useKeybinds = <Slug extends string>(callbacks: KeybindCallbacks<Slug> = {}) => {
  const focusedElement = useFocusedElement();
  const { combinationsToKeybindKey } = useContext(KeybindsContext);

  useEffect(() => {
    const pressedKeyCodes = new Set<KeyboardEventKeycode>([]);
    const recentlyPressedKeyCodes = new Set<KeyboardEventKeycode>([]);

    const resetState = () => {
      pressedKeyCodes.clear();
      recentlyPressedKeyCodes.clear();
    };

    const isKeyCodeUsed = (keyCode: KeyboardEventKeycode) => {
      const allCombinationsString = Object.keys(combinationsToKeybindKey).join("");
      return allCombinationsString.includes(keyCode);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      // Block the event if the user is focusing a blacklisted element
      if (focusedElement && ["INPUT", "TEXTAREA"].includes(focusedElement.tagName)) {
        return;
      }

      const keyCode = event.code as KeyboardEventKeycode;

      if (isKeyCodeUsed(keyCode)) {
        pressedKeyCodes.add(keyCode);
        recentlyPressedKeyCodes.add(keyCode);
        setTimeout(() => recentlyPressedKeyCodes.delete(keyCode), 4000);
      } else {
        resetState();
      }

      const combinationString = createKeybindCombinationString([...pressedKeyCodes], false);
      const sequentialCombinationString = createKeybindCombinationString(
        [...recentlyPressedKeyCodes],
        true,
      );
      const keybindSlug = combinationsToKeybindKey[combinationString] as Slug;
      const sequentialKeybindSlug = combinationsToKeybindKey[sequentialCombinationString] as Slug;

      if (sequentialKeybindSlug) resetState();

      const callbackFunction = callbacks[sequentialKeybindSlug ?? keybindSlug];
      if (!callbackFunction) return;

      recentlyPressedKeyCodes.clear();
      callbackFunction(event);
    };

    const handleKeyup = (e: KeyboardEvent) => {
      // Block the event if the user is focusing a blacklisted element
      if (focusedElement && ["INPUT", "TEXTAREA"].includes(focusedElement.tagName)) {
        return;
      }

      const keyCode = e.code as KeyboardEventKeycode;
      pressedKeyCodes.delete(keyCode);
    };

    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, [callbacks, combinationsToKeybindKey, focusedElement]);
};

export default useKeybinds;
