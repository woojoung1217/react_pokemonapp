/* eslint-disable */
import React, { useRef } from "react";
import DamageRelations from "./DamageRelations";
import useOnClickOutSide from "../hooks/useOnClickOutSide";

const DamageModal = ({ setIsModalOpen, damages }) => {
  // dom
  const ref = useRef();
  // dom control custom hooks
  useOnClickOutSide(ref, () => {
    setIsModalOpen(false);
  });

  return (
    <div className="flex items-center justify-center z-40 fixed left-0 bottom-0 w-full h-full bg-gray-800">
      <div ref={ref} className="modal bg-white rounded-lg w-1/2 py-2 ">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full justify-between">
            <div className="text-gray-900 font-medium text text-lg">
              데미지 관계
            </div>
            <span
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="text-gray-900 font-medium text-lg cursor-pointer"
            >
              X
            </span>
          </div>
        </div>
        <DamageRelations damages={damages} />
      </div>
    </div>
  );
};

export default DamageModal;
