import useUserStore from "../../../store/useUserStore";
import sendNotif from "../../../utils/sendNotif";

const AuthProvider = ({ children }) => {
  const { token } = useUserStore((state) => ({
    token: state?.token,
  }));
  if (!token) sendNotif("توکن ست نشده", "error");
  if (token) sendNotif("توکن ست شد", "success");
  return <>{children}</>;
};

export default AuthProvider;
