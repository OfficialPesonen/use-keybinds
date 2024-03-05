import React, { useCallback, useEffect, useState } from "react";

const useFocusedElement = (): Element | null => {
  const [focusedElement, setFocusedElement] = useState<Element | null>(
    typeof window !== "undefined" ? document.activeElement : null
  );

  const handleFocusIn = useCallback(() => {
    setFocusedElement(document.activeElement);
  }, []);

  const handleFocusOut = useCallback(() => {
    setFocusedElement(null);
  }, []);

  useEffect(() => {
    addEventListener("focusin", handleFocusIn);
    addEventListener("focusout", handleFocusOut);
    return () => {
      removeEventListener("focusin", handleFocusIn);
      removeEventListener("focusout", handleFocusOut);
    };
  }, [handleFocusIn, handleFocusOut]);

  return focusedElement;
};

export default useFocusedElement;
