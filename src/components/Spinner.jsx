import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ThreeCircles
        height="90"
        width="90"
        radius="9"
        color="#F05656"
        ariaLabel="three-circles-loading"
        wrapperStyle={({ width: "fit-content" }, { margin: "20px 0" })}
        wrapperClassName="text-center w-auto my-3"
        visible={true}
      />
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Spinner;
