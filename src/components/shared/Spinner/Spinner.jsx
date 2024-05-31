import BounceLoader from "react-spinners/BounceLoader";

const Spinner = ({ size, color, text = "" }) => {
  return (
    <div className="flex justify-center items-center text-center flex-col">
      <BounceLoader color={color} size={size} />
      <p>{text}</p>
    </div>
  );
};

export default Spinner;
