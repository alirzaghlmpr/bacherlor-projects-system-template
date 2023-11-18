import Logout from "../../../shared/Logout";
import Offcanva from "../../../shared/Offcanva";

const Mobile = ({ navbar }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-slate-100 text-sm">
      <Offcanva menu={navbar} />
      <div className="flex gap-2">
        <p>علیرضا غلامپور</p>
        <p>3981231076</p>
      </div>
      <Logout />
    </div>
  );
};

export default Mobile;
