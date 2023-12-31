import LogoutIcon from "../../../assets/icons/logout.png";
import Modal from "../Modal";
import ConfirmLogoutModal from "../../../constants/ConfirmLogoutModal";
import { useNavigate } from "react-router";
import { shallow } from "zustand/shallow";
import useUserStore from "../../../store/useUserStore";

import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { token, resetUserInfo } = useUserStore(
    (state) => ({
      token: state?.token,
      resetUserInfo: state?.resetUserInfo,
    }),
    shallow
  );

  useEffect(() => {
    !token && navigate("/");
  }, [token]);

  const handleLogout = () => {
    resetUserInfo();
  };
  return (
    <Modal
      buttonContent={<img src={LogoutIcon} width="25" alt="" />}
      header={ConfirmLogoutModal?.header}
      content={ConfirmLogoutModal?.content}
      acceptHandeler={handleLogout}
    />
  );
};

export default Logout;
