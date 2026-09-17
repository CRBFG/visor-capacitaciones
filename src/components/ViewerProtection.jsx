import { useEffect } from "react";

function ViewerProtection() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleSelectStart = (event) => {
      event.preventDefault();
    };

    const handleDragStart = (event) => {
      event.preventDefault();
    };

    const handleCopy = (event) => {
      event.preventDefault();
    };

    const handleCut = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      const blocked =
        (event.ctrlKey &&
          ["c", "x", "s", "u", "p"].includes(key)) ||
        (event.ctrlKey &&
          event.shiftKey &&
          ["i", "j", "c"].includes(key));

      if (blocked) {
        event.preventDefault();
      }
    };

    document.addEventListener(
      "contextmenu",
      handleContextMenu
    );

    document.addEventListener(
      "selectstart",
      handleSelectStart
    );

    document.addEventListener(
      "dragstart",
      handleDragStart
    );

    document.addEventListener(
      "copy",
      handleCopy
    );

    document.addEventListener(
      "cut",
      handleCut
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "contextmenu",
        handleContextMenu
      );

      document.removeEventListener(
        "selectstart",
        handleSelectStart
      );

      document.removeEventListener(
        "dragstart",
        handleDragStart
      );

      document.removeEventListener(
        "copy",
        handleCopy
      );

      document.removeEventListener(
        "cut",
        handleCut
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return null;
}

export default ViewerProtection;