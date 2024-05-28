import BounceLoader from "react-spinners/BounceLoader";

const Spinner = ({ size, color }) => {
  return (
    <div className="flex justify-center items-center text-center">
      <BounceLoader color={color} size={size} />
    </div>
  );
};

export default Spinner;
