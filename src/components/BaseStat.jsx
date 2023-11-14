/* eslint-disable */
import React from "react";
import { useRef, useEffect } from "react";

const BaseStat = ({ valueStat, nameStat, type }) => {
  const bg = type ? `bg-${type}` : "";

  const ref = useRef(null);

  useEffect(() => {
    const setValueStat = ref.current;
    const calc = valueStat * (100 / 255);
    setValueStat.style.width = calc + "%";
  }, []);

  return (
    <tr className="w-full text-white">
      <td className="sm:px-5">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={
            "flex items-start h-2 min-w-[10rem] bg-gray-600 rounded overflow-hidden"
          }
        >
          <div className={`h-3 ${type ? `bg-${type}` : ""}`} ref={ref}></div>
        </div>
      </td>
      <td className="px-2">255</td>
    </tr>
  );
};

export default BaseStat;
