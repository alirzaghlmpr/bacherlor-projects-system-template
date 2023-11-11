import Logout from "../../shared/Logout";
const Header = ({ navbar }) => {
  return (
    <div className="flex justify-around items-center p-3 bg-slate-100 text-sm">
      <div className="flex gap-5">
        <p>علیرضا غلامپور</p>
        <p>3981231076</p>
      </div>

      <div>
        <ul className="list-none flex gap-5">
          {navbar.map(({ text, id }) => (
            <li className="cursor-pointer" key={id}>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <Logout />
    </div>
  );
};

export default Header;
