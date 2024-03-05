import React, { useState } from "react";
import { KeybindsProvider, useKeybinds } from "use-keybinds";

export type KeybindSlug = "OPEN_MAP" | "NEW_MAP" | "GO_TO_MAP";
const App = () => {
  return (
    <KeybindsProvider<KeybindSlug>
      keybinds={{
        OPEN_MAP: {
          displayName: "Open map",
          description: "Open map",
          combination: ["KeyM"],
        },
        NEW_MAP: {
          displayName: "Open map",
          description: "Open map",
          combination: ["ShiftLeft", "KeyM"],
        },
        GO_TO_MAP: {
          displayName: "Open map",
          description: "Open map",
          isSequential: true,
          combination: ["KeyG", "KeyM"],
        },
      }}
    >
      <KeybindTesting />
    </KeybindsProvider>
  );
};

const KeybindTesting = () => {
  const [current, setCurrent] = useState<string>("No keybind selected");

  useKeybinds<KeybindSlug>({
    OPEN_MAP: () => {
      setCurrent("Open Map (KeyM)");
    },
    NEW_MAP: () => {
      setCurrent("New Map (ShiftLeft+KeyM)");
    },
    GO_TO_MAP: () => {
      setCurrent("Go To Map (KeyG then KeyM)");
    },
  });

  return (
    <div>
      <p>{current}</p>
    </div>
  );
};

export default App;
