# use-keybinds
A lightweight and typesafe library for managing keybinds in React applications.

## Features
- Single keypresses such as (ArrowUP)
- Multiple keypresses such as (Ctrl + C)
- Sequential keypresses such as (G then H)

## Usage
```tsx
import {KeybindsProvider, useKeybinds} from "use-keybinds";

// Optional but heavily recommended for type safety
export type KeybindSlug = "SUBMIT" | "GO_TO_HOME";

const App = () => {
    return (
        <KeybindsProvider<KeybindSlug>
            keybinds={{
                SUBMIT: {
                    name: "Submit form",
                    keybind: ["Enter"]
                },
                GO_TO_HOME: {
                    name: "Go to home",
                    keybind: ["KeyG", "KeyH"],
                    isSequential: true
                }
            }}
        >
            <Component/>
        </KeybindsProvider>
    );
};

const Component = () => {
    const [current, setCurrent] = useState<string>("");

    useKeybinds<KeybindSlug>({
        SUBMIT: (e) => {
            e.preventDefault();
            setCurrent("submit")
        },
        GO_TO_HOME: (e) => {
            e.preventDefault();
            setCurrent("go to home")
        }
    })

    return (
        <div>
            <p>Current keybind: {current}</p>
        </div>
    )
}
```

## License
MIT