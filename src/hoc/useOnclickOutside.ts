import { useEffect } from "react";

export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null | undefined>,
  callback: (event: Event) => void,
  attach: boolean = true
) => {
  useEffect(() => {
    if (!attach) return;

    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node | null)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback, attach]);
};
