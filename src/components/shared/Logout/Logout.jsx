import LogoutIcon from "../../../assets/icons/logout.png";
const Logout = () => {
  return (
    <button className="text-sm p-1 rounded-lg  bg-slate-500" type="submit">
      <img src={LogoutIcon} width="25" alt="" />
    </button>
  );
};

export default Logout;
