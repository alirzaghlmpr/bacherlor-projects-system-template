import LogoutIcon from "../../../assets/icons/logout.png";
import Modal from "../Modal";
import ConfirmLogoutModal from "../../../constants/ConfirmLogoutModal";
const Logout = () => {
  return (
    <Modal
      buttonContent={<img src={LogoutIcon} width="25" alt="" />}
      header={ConfirmLogoutModal?.header}
      content={ConfirmLogoutModal?.content}
    />
  );
};

export default Logout;
