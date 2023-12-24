import BounceLoader from "react-spinners/BounceLoader";

const Spinner = ({ size, color }) => {
  return <BounceLoader color={color} size={size} />;
};

export default Spinner;
