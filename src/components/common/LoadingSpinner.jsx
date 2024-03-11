import { Hourglass, FallingLines } from "react-loader-spinner";

export const LoadingHourGlass = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-full mt-10 overflow-hidden">
      <div className="flex flex-col w-full min-h-[500px] items-center justify-center">
        <Hourglass
          visible={true}
          height="50"
          width="50"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#87A922", "#114232"]}
        />
      </div>
    </div>
  );
};

export const LoadingFallingLines = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <FallingLines
        color="#87A922"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};
