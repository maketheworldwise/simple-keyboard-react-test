import { useEffect, useRef, useState } from "react";
import { keyboardConfig } from "./keyboardConfig";
import { HangulImeInputWrapper } from "mole-virtual-keyboard";

import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "./App.css";

let inputWrapper = HangulImeInputWrapper;

function App() {
  const [isShift, setIsShift] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    if (!inputRef.current) return;
    inputWrapper = new HangulImeInputWrapper(inputRef.current);
  }, []);

  const onChange = (input) => {
    // console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}") {
      setIsShift(!isShift);
      return;
    }

    if (button === "{bksp}") {
      inputWrapper?.backspace();
    } else if (button === "{space}") {
      inputWrapper?.insert(" ");
    } else {
      inputWrapper?.insert(button);
    }
  };

  return (
    <div className="container">
      <div className="keyboard_container">
        <input
          ref={inputRef}
          type="text"
          onSelect={() => {
            inputWrapper?.checkChangedSelect();
          }}
        />
        <KeyboardReact
          layout={keyboardConfig.layout}
          layoutName={isShift ? "shift" : "default"}
          display={keyboardConfig.display}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}

export default App;
