import { useEffect } from "react";
/* eslint-disable */

export default function useOnClickOutSide(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log(event.target);
      if (!ref.current || ref.current.contains(event.target)) {
        // 모달 안을 클릭 했는지
        return;
      }
      // 모달 밖을 클릭 했는지
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
