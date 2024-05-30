import LogoutIcon from "../../../assets/icons/logout.png";
import Modal from "../Modal";
import ConfirmLogoutModal from "../../../constants/ConfirmLogoutModal";
import { useNavigate } from "react-router";
import { shallow } from "zustand/shallow";
import useUserStore from "../../../store/useUserStore";

import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const { resetUserInfo, localStorageKey } = useUserStore((state) => ({
    resetUserInfo: state?.resetUserInfo,
    localStorageKey: state?.localStorageKey,
  }));

  const handleLogout = () => {
    resetUserInfo();
    localStorage.removeItem(localStorageKey);
    navigate("/login");
    
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
