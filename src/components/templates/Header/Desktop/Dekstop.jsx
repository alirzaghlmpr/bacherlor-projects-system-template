import Logout from "../../../shared/Logout";
import { shallow } from "zustand/shallow";
import useUserStore from "../../../../store/useUserStore";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dekstop = ({ navbar }) => {
  const { pathname } = useLocation();

  const { firstName, lastName, suid } = useUserStore(
    (state) => ({
      firstName: state?.firstName,
      lastName: state?.lastName,
      suid: state?.suid,
    }),
    shallow
  );

  return (
    <div className="flex justify-around items-center p-3 bg-slate-100 text-sm">
      <div className="flex gap-5">
        <p>
          {firstName} {lastName}
        </p>
        <p>{suid}</p>
      </div>

      <div>
        <ul className="list-none flex gap-5">
          {navbar.map(({ text, id, to }) => (
            <Link
              className={`cursor-pointer py-1 px-3 ${
                to === pathname ? "bg-slate-500 text-slate-50 rounded-lg" : ""
              }`}
              key={id}
              to={to}>
              {text}
            </Link>
          ))}
        </ul>
      </div>

      <Logout />
    </div>
  );
};

export default Dekstop;
