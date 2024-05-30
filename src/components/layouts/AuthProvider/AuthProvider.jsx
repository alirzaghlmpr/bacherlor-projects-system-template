import { useEffect } from "react";
import useUserStore from "../../../store/useUserStore";

const AuthProvider = ({ children }) => {
  const { localStorageKey, setUserInfo } = useUserStore((state) => ({
    localStorageKey: state?.localStorageKey,
    setUserInfo: state?.setUserInfo,
  }));

  useEffect(() => {
    const localStorageData = localStorage.getItem(localStorageKey);
    localStorageData && setUserInfo(JSON.parse(localStorageData));
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
