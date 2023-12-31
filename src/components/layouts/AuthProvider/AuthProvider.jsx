import { useEffect } from "react";
import NotifMessages from "../../../constants/NotifMessages";
import useUserStore from "../../../store/useUserStore";
import sendNotif from "../../../utils/sendNotif";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token, role } = useUserStore((state) => ({
    token: state?.token,
  }));

  useEffect(() => {
    if (!token) {
      sendNotif(
        NotifMessages.Login.NoToken.text,
        NotifMessages.Login.NoToken.type
      );
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
