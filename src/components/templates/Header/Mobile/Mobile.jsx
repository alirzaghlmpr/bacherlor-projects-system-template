import Logout from "../../../shared/Logout";
import Offcanva from "../../../shared/Offcanva";
import { shallow } from "zustand/shallow";
import useUserStore from "../../../../store/useUserStore";
import { useLocation } from "react-router";

const Mobile = ({ navbar }) => {
  const { firstName, lastName, suid } = useUserStore(
    (state) => ({
      firstName: state?.firstName,
      lastName: state?.lastName,
      suid: state?.suid,
    }),
    shallow
  );
  return (
    <div className="flex justify-between items-center p-3 bg-slate-100 text-sm">
      <Offcanva menu={navbar} />
      <div className="flex gap-2">
        <p>
          {firstName} {lastName}
        </p>
        <p>{suid}</p>
      </div>
      <Logout />
    </div>
  );
};

export default Mobile;
