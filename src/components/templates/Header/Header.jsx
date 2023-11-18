import Desktop from "./Desktop";
import Mobile from "./Mobile";

import useScreenSize from "../../../hooks/useScreenSize";

const Header = ({ navbar }) => {
  const { width } = useScreenSize();

  return width > 780 ? <Desktop navbar={navbar} /> : <Mobile navbar={navbar} />;
};

export default Header;
